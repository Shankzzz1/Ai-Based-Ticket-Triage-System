import { prisma } from "../../config/db";
import { TicketCategory } from "@prisma/client";

export const assignAgent = async (category: TicketCategory) => {
  // Get all agents
  const agents = await prisma.user.findMany({
    where: {
      role: "AGENT",
    },
    include: {
      ticketsAssigned: {
        where: {
          status: {
            in: ["OPEN", "IN_PROGRESS"],
          },
        },
      },
    },
  });

  if (agents.length === 0) {
    return null;
  }

  // Choose agent with least active tickets
  const sortedAgents = agents.sort(
    (a, b) => a.ticketsAssigned.length - b.ticketsAssigned.length
  );

  return sortedAgents[0];
};
