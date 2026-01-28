from fastapi import FastAPI
from app.schemas import SLAPredictionRequest, SLAPredictionResponse
from app.predict import SLABreachPredictor

app = FastAPI(title="SLA Breach Prediction Service")

predictor = SLABreachPredictor()

@app.post(
    "/predict-sla-breach",
    response_model=SLAPredictionResponse
)
def predict_sla_breach(request: SLAPredictionRequest):
    result = predictor.predict(
        priority=request.priority,
        agent_load=request.agent_load,
        hours_since_created=request.hours_since_created,
        sla_hours=request.sla_hours
    )

    return result
