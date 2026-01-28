import { TicketCategory, TicketPriority } from "@prisma/client";

export const ticketRules = [
  {
    keywords: ["password", "login", "access", "reset"],
    category: TicketCategory.ACCESS,
    priority: TicketPriority.P2,
  },
  {
    keywords: ["server", "down", "crash", "unreachable"],
    category: TicketCategory.NETWORK,
    priority: TicketPriority.P1,
  },
  {
    keywords: ["install", "bug", "error", "software"],
    category: TicketCategory.SOFTWARE,
    priority: TicketPriority.P3,
  },
];
