import axios from "axios";
import { TicketPriority } from "@prisma/client";

const AI_SERVICE_URL = "http://localhost:8000/predict-sla-breach";

const priorityToInt = (priority: TicketPriority): number => {
  switch (priority) {
    case "P1":
      return 1;
    case "P2":
      return 2;
    case "P3":
      return 3;
    case "P4":
      return 4;
    default:
      return 4;
  }
};

export const predictSLABreach = async (params: {
  priority: TicketPriority;
  agentLoad: number;
  hoursSinceCreated: number;
  slaHours: number;
}) => {
  const response = await axios.post(AI_SERVICE_URL, {
    priority: priorityToInt(params.priority),
    agent_load: params.agentLoad,
    hours_since_created: params.hoursSinceCreated,
    sla_hours: params.slaHours,
  });

  return response.data as {
    breach_risk: number;
    will_breach: boolean;
  };
};
