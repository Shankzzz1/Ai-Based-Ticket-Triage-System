import pandas as pd
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# -----------------------------
# 1. LOAD DATA
# -----------------------------
# Expected columns:
# priority, agent_load, hours_open, sla_hours, breached

data = pd.read_csv("dataset.csv")

X = data[[
    "priority",
    "agent_load",
    "hours_open",
    "sla_hours"
]]

y = data["breached"]

# -----------------------------
# 2. TRAIN / TEST SPLIT
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------
# 3. TRAIN MODEL
# -----------------------------
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# -----------------------------
# 4. EVALUATE MODEL
# -----------------------------
y_pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# -----------------------------
# 5. SAVE MODEL
# -----------------------------
joblib.dump(model, "../models/sla_model.pkl")

print("\n✅ Model saved as sla_model.pkl")
