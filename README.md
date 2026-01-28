# 🤖 AI-Based Ticket Triage & Auto-Resolution System

An enterprise-style **AI-powered IT Service Desk system** that automatically classifies tickets, assigns priorities, predicts SLA breaches, and routes tickets to agents using a **hybrid rule-based + AI architecture**.

This project is designed to **mirror real-world service desk systems** used in large organizations.

---

## 🚀 Features

### ✅ Core Features
- Ticket creation & tracking
- Automatic agent assignment
- SLA calculation & monitoring
- SLA breach detection
- Escalation workflow
- Dashboard with live SLA status

### 🧠 AI-Powered Features
- **Semantic ticket classification** (handles poor / informal language)
- **AI-based priority prediction**
- **SLA breach risk prediction**
- Hybrid decision system (Rules + AI fallback)

---

## 🏗️ System Architecture

Frontend (React)
↓
Backend API (Node.js + TypeScript)
↓
Database (PostgreSQL + Prisma)
↓
AI Microservice (FastAPI + ML)


---

## 🧠 How AI Is Used (Important)

| Use Case | AI Technique |
|--------|--------------|
Ticket category classification | Text embeddings (semantic similarity)
Ticket priority prediction | Text embeddings
SLA breach prediction | ML model (logistic / tree-based)
Fallback logic | Rule-based + AI hybrid

❗ AI is used **only when rule confidence is low**, ensuring reliability and explainability.

---

## 🔄 Ticket Classification Flow

User submits ticket
↓
Rule-based classifier
↓
Confidence ≥ 0.6 ? ── Yes → Done
│
No
↓
AI embedding-based classification
↓
AI priority prediction
↓
SLA calculation
↓
Agent assignment


---

## 🧩 Project Structure

Ticket-Triage-System/
│
├── backend/ # Node.js + TypeScript API
│ ├── prisma/
│ └── src/
│ ├── modules/
│ │ └── ticket/
│ ├── jobs/
│ ├── routes/
│ └── server.ts
│
├── ml-service/ # Python FastAPI AI service
│ ├── app/
│ │ ├── main.py
│ │ ├── embedding_classifier.py
│ │ ├── priority_classifier.py
│ │ └── sla_predictor.py
│ ├── models/
│ └── training/
│
├── frontend/ # React + TypeScript UI
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── types/
│
└── README.md


---

## 🛠️ Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL

### AI / ML
- Python
- FastAPI
- Sentence Transformers (`all-MiniLM-L6-v2`)
- Scikit-learn
- NumPy / Pandas

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

---

## 🧪 API Endpoints

### Backend
POST /api/tickets
GET /api/tickets
GET /api/tickets/:id
PATCH /api/tickets/:id/assign
PATCH /api/tickets/:id/resolve


### AI Microservice
POST /classify-ticket
POST /predict-priority
POST /predict-sla-breach


Swagger UI:
http://localhost:8000/docs


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd Ticket-Triage-System
2️⃣ Backend Setup
cd backend
npm install
npx prisma migrate dev
npm run dev
Backend runs on:

http://localhost:5000
3️⃣ AI Service Setup
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload
AI service runs on:

http://localhost:8000
4️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:3000
📊 Example AI Output
{
  "category": "NETWORK",
  "priority": "P1",
  "confidence": 0.82,
  "breach_risk": 0.31,
  "will_breach": false
}
