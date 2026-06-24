// escalation.service.ts
import { prisma } from "../../config/db";
import { TicketPriority } from "@prisma/client";

export const escalateTicket = async (
  ticketId: string,
  priority: TicketPriority
) => {
  // P1 → escalate immediately
  if (priority === "P1") {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        priority: "P1", // stays P1
      },
    });

    console.log(`🚨 CRITICAL SLA BREACH for Ticket ${ticketId}`);
  }

  // P2/P3 → notify / reassign later (future enhancement)
};
