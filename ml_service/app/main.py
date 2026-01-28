from fastapi import FastAPI

from app.schemas import (
    SLAPredictionRequest,
    SLAPredictionResponse,
    TicketClassificationRequest,
    TicketClassificationResponse,
    PriorityPredictionRequest,
    PriorityPredictionResponse,
)

from app.predict import SLABreachPredictor
from app.embedding_classifier import classify_with_embeddings
from app.priority_classifier import predict_priority

app = FastAPI(title="AI Ticket Intelligence Service")

# --------------------------------------------------
# MODEL INITIALIZATION
# --------------------------------------------------

# 🔮 SLA breach prediction model
sla_predictor = SLABreachPredictor()


# --------------------------------------------------
# SLA BREACH PREDICTION
# --------------------------------------------------
@app.post(
    "/predict-sla-breach",
    response_model=SLAPredictionResponse
)
def predict_sla_breach(request: SLAPredictionRequest):
    """
    Predicts probability of SLA breach.
    Used by backend cron for early escalation.
    """
    return sla_predictor.predict(
        priority=request.priority,
        agent_load=request.agent_load,
        hours_since_created=request.hours_since_created,
        sla_hours=request.sla_hours
    )


# --------------------------------------------------
# TICKET CATEGORY CLASSIFICATION (EMBEDDINGS)
# --------------------------------------------------
@app.post(
    "/classify-ticket",
    response_model=TicketClassificationResponse
)
def classify_ticket(request: TicketClassificationRequest):
    """
    Semantic ticket classification using embeddings.
    Handles poor / informal user language.
    Used as fallback when rule-based confidence is low.
    """
    return classify_with_embeddings(request.text)


# --------------------------------------------------
# TICKET PRIORITY PREDICTION (EMBEDDINGS)
# --------------------------------------------------
@app.post(
    "/predict-priority",
    response_model=PriorityPredictionResponse
)
def predict_ticket_priority(request: PriorityPredictionRequest):
    """
    Predicts ticket priority using semantic similarity.
    Used as fallback when rule-based priority confidence is low.
    """
    return predict_priority(request.text)
