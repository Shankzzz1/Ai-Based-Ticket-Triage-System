import { prisma } from "../../config/db";
import { predictSLABreach } from "./sla.prediction.service";
import { escalateTicket } from "./escalation.service";

export const checkSLABreaches = async () => {
  const now = new Date();

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
    const hoursSinceCreated =
      (now.getTime() - ticket.createdAt.getTime()) / (1000 * 60 * 60);

    const slaHours =
      (ticket.sla!.dueBy.getTime() - ticket.createdAt.getTime()) /
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


    // 🚨 Early escalation
    if (prediction.will_breach) {
      await escalateTicket(ticket.id, ticket.priority);
    }

    // ❌ Actual SLA breach
    if (now > ticket.sla!.dueBy) {
      await prisma.sLA.update({
        where: { id: ticket.sla!.id },
        data: { breached: true },
      });
    }
  }
};
