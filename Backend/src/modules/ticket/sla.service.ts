import { TicketPriority } from "@prisma/client";
import { SLA_RULES } from "./sla.rules";

export const calculateSLADueTime = (priority: TicketPriority): Date => {
  const hours = SLA_RULES[priority];
  const dueTime = new Date();
  dueTime.setHours(dueTime.getHours() + hours);
  return dueTime;
};
