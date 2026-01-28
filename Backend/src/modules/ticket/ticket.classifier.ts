import { TicketCategory, TicketPriority } from "@prisma/client";
import { ticketRules } from "./ticket.rules";

type ClassificationResult = {
  category: TicketCategory;
  priority: TicketPriority;
  confidence: number;
};

export const classifyTicket = (text: string): ClassificationResult => {
  const lowerText = text.toLowerCase();

  for (const rule of ticketRules) {
    const matches = rule.keywords.filter(keyword =>
      lowerText.includes(keyword)
    );

    if (matches.length > 0) {
      return {
        category: rule.category,
        priority: rule.priority,
        confidence: Math.min(0.6 + matches.length * 0.1, 0.9),
      };
    }
  }

  return {
    category: TicketCategory.OTHER,
    priority: TicketPriority.P4,
    confidence: 0.3,
  };
};
