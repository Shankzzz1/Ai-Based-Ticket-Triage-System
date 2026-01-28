import { TicketPriority } from "@prisma/client";

export const SLA_RULES: Record<TicketPriority, number> = {
  P1: 1,   // hours
  P2: 4,
  P3: 8,
  P4: 24,
};
