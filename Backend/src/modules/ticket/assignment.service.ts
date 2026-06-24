// assignment.service.ts

import { prisma } from "../../config/db";
import { TicketCategory } from "@prisma/client";

export const assignAgent = async (
  category: TicketCategory
) => {
  console.log(
    `🔍 Looking for agents specialized in ${category}`
  );

  // Find agents matching ticket category
  const specializedAgents =
    await prisma.user.findMany({
      where: {
        role: "AGENT",
        specialization: category,
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

  // If specialized agents exist
  if (specializedAgents.length > 0) {
    specializedAgents.sort(
      (a, b) =>
        a.ticketsAssigned.length -
        b.ticketsAssigned.length
    );

    console.log(
      `✅ Assigned specialist: ${specializedAgents[0].name}`
    );

    return specializedAgents[0];
  }

  console.log(
    `⚠️ No specialized agent found for ${category}`
  );

  // Fallback → least busy AGENT
  const fallbackAgents =
    await prisma.user.findMany({
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

  if (fallbackAgents.length === 0) {
    console.log(
      "❌ No AGENT users available"
    );
    return null;
  }

  fallbackAgents.sort(
    (a, b) =>
      a.ticketsAssigned.length -
      b.ticketsAssigned.length
  );

  console.log(
    `🔄 Fallback assignment → ${fallbackAgents[0].name}`
  );

  return fallbackAgents[0];
};