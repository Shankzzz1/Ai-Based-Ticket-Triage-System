import { prisma } from "../../config/db";
import { CreateTicketDTO } from "./ticket.types";
import { classifyTicket } from "./ticket.classifier";
import { calculateSLADueTime } from "./sla.service";
import { assignAgent } from "./assignment.service";


/**
 * Create a new ticket with rule-based classification
 */
export const createTicket = async (data: CreateTicketDTO) => {
  const classification = classifyTicket(
    `${data.title} ${data.description}`
  );

  const slaDueBy = calculateSLADueTime(classification.priority);

  const agent = await assignAgent(classification.category);

  return prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,

      status: agent ? "IN_PROGRESS" : "OPEN",
      category: classification.category,
      priority: classification.priority,
      confidence: classification.confidence,

      createdById: data.createdById,
      assignedToId: agent?.id,

      sla: {
        create: {
          dueBy: slaDueBy,
        },
      },
    },
    include: {
      assignedTo: true,
      sla: true,
    },
  });
};

/**
 * Fetch all tickets
 */
export const getAllTickets = async () => {
  return prisma.ticket.findMany({
    include: {
      createdBy: true,
      assignedTo: true,
      sla: true,
    },
  });
};

/**
 * Fetch single ticket by ID
 */
export const getTicketById = async (id: string) => {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      createdBy: true,
      assignedTo: true,
      sla: true,
    },
  });
};

/**
 * Assign a ticket to an agent
 */
export const assignTicket = async (ticketId: string, agentId: string) => {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId: agentId,
      status: "IN_PROGRESS",
    },
  });
};

/**
 * Resolve a ticket
 */
export const resolveTicket = async (ticketId: string) => {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "RESOLVED",
      resolvedAt: new Date(),
    },
  });
};
