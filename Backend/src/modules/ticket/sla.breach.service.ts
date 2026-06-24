// sla.breach.service.ts
import { prisma } from "../../config/db";
import { predictSLABreach } from "./sla.prediction.service";
import { escalateTicket } from "./escalation.service";

export const checkSLABreaches = async () => {
  const now = new Date();

  console.log("🔍 Checking SLA breaches...");

  const tickets = await prisma.ticket.findMany({
    where: {
      status: {
        not: "RESOLVED",
      },
      sla: {
        breached: false,
      },
    },
    include: {
      sla: true,
      assignedTo: {
        include: {
          ticketsAssigned: {
            where: {
              status: {
                in: ["OPEN", "IN_PROGRESS"],
              },
            },
          },
        },
      },
    },
  });

  for (const ticket of tickets) {
    // ⚠️ Safety: SLA must exist
    if (!ticket.sla) continue;

    const hoursSinceCreated =
      (now.getTime() - ticket.createdAt.getTime()) / (1000 * 60 * 60);

    const slaHours =
      (ticket.sla.dueBy.getTime() - ticket.createdAt.getTime()) /
      (1000 * 60 * 60);

    const agentLoad = ticket.assignedTo
      ? ticket.assignedTo.ticketsAssigned.length
      : 0;

    // 🔮 AI prediction
    const prediction = await predictSLABreach({
      priority: ticket.priority,
      agentLoad,
      hoursSinceCreated,
      slaHours,
    });

    console.log("🤖 AI prediction:", prediction);

    // 🔮 SAVE AI RISK (for frontend + analytics)
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        aiRisk: prediction.breach_risk,
      },
    });

    // 🚨 Early escalation (AI-assisted)
    if (prediction.will_breach) {
      console.log(`🚨 Early escalation for ticket ${ticket.id}`);
      await escalateTicket(ticket.id, ticket.priority);
    }

    // ❌ Actual SLA breach (deterministic rule)
    if (now > ticket.sla.dueBy) {
      await prisma.sLA.update({
        where: { id: ticket.sla.id },
        data: { breached: true },
      });

      console.log(`❌ SLA breached for ticket ${ticket.id}`);
    }
  }
};
