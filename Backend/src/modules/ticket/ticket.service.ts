import { prisma } from "../../config/db";
import { CreateTicketDTO } from "./ticket.types";
import { classifyTicket } from "./ticket.classifier";
import { calculateSLADueTime } from "./sla.service";
import { assignAgent } from "./assignment.service";
import axios from "axios";

const ML_SERVICE_URL = "http://localhost:8000";

/**
 * Create a new ticket with hybrid AI classification
 * - Rule-based first
 * - AI fallback for category + priority
 */
export const createTicket = async (data: CreateTicketDTO) => {
  const text = `${data.title} ${data.description}`;

  // 1️⃣ Rule-based classification
  let classification = classifyTicket(text);

  // 2️⃣ AI fallback for CATEGORY if confidence is low
  if (classification.confidence < 0.6) {
    try {
      const categoryResponse = await axios.post(
        `${ML_SERVICE_URL}/classify-ticket`,
        { text }
      );

      classification = {
        ...classification,
        category: categoryResponse.data.category,
        confidence: categoryResponse.data.confidence,
      };
    } catch (error) {
      console.warn("⚠️ AI category classification failed, using rule-based result");
    }
  }

  // 3️⃣ AI fallback for PRIORITY if confidence is still low
  if (classification.confidence < 0.6) {
    try {
      const priorityResponse = await axios.post(
        `${ML_SERVICE_URL}/predict-priority`,
        { text }
      );

      classification.priority = priorityResponse.data.priority;
    } catch (error) {
      console.warn("⚠️ AI priority prediction failed, using rule-based priority");
    }
  }

  // 4️⃣ SLA calculation (after final priority)
  const slaDueBy = calculateSLADueTime(classification.priority);

  // 5️⃣ Agent assignment
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
