export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  confidence: number;
  createdAt: string;
  assignedTo?: {
    name: string;
  };
  sla?: {
    dueBy: string;
    breached: boolean;
  };
  aiRisk?: number; // 🔮 AI-predicted SLA breach risk (0–1)
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  createdById: string;
}
