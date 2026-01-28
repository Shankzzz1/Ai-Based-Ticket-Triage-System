import joblib
import numpy as np
from training.feature_engineering import build_feature_vector

MODEL_PATH = "models/sla_model.pkl"

class SLABreachPredictor:
    def __init__(self):
        self.model = joblib.load(MODEL_PATH)

    def predict(
        self,
        priority: int,
        agent_load: int,
        hours_since_created: float,
        sla_hours: int
    ):
        X = build_feature_vector(
            priority,
            agent_load,
            hours_since_created,
            sla_hours
        )

        risk = self.model.predict_proba(np.array(X))[0][1]

        return {
            "breach_risk": risk,
            "will_breach": risk > 0.7
        }
