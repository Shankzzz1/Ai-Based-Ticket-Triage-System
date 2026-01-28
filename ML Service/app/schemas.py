from pydantic import BaseModel

class SLAPredictionRequest(BaseModel):
    priority: int
    agent_load: int
    hours_since_created: float
    sla_hours: float   # ✅ changed from int → float

class SLAPredictionResponse(BaseModel):
    breach_risk: float
    will_breach: bool
