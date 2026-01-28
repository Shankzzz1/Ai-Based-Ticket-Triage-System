from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from training.priority_samples import PRIORITY_SAMPLES

model = SentenceTransformer("all-MiniLM-L6-v2")

PRIORITY_EMBEDDINGS = {}

for priority, samples in PRIORITY_SAMPLES.items():
    embeddings = model.encode(samples)
    PRIORITY_EMBEDDINGS[priority] = np.mean(embeddings, axis=0)


def predict_priority(text: str):
    text_embedding = model.encode([text])[0]

    best_priority = None
    best_score = 0.0

    for priority, embedding in PRIORITY_EMBEDDINGS.items():
        score = cosine_similarity(
            [text_embedding],
            [embedding]
        )[0][0]

        if score > best_score:
            best_priority = priority
            best_score = score

    return {
        "priority": best_priority,
        "confidence": float(best_score)
    }
