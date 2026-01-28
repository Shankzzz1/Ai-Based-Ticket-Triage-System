from pydantic import BaseModel


# ---------------- SLA ----------------
class SLAPredictionRequest(BaseModel):
    priority: int
    agent_load: int
    hours_since_created: float
    sla_hours: float


class SLAPredictionResponse(BaseModel):
    breach_risk: float
    will_breach: bool


# ---------------- CLASSIFICATION ----------------
class TicketClassificationRequest(BaseModel):
    text: str


class TicketClassificationResponse(BaseModel):
    category: str
    confidence: float



class PriorityPredictionRequest(BaseModel):
    text: str


class PriorityPredictionResponse(BaseModel):
    priority: str
    confidence: float