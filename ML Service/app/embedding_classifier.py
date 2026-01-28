from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from training.category_samples import CATEGORY_SAMPLES

model = SentenceTransformer("all-MiniLM-L6-v2")

# Precompute category embeddings
CATEGORY_EMBEDDINGS = {}

for category, samples in CATEGORY_SAMPLES.items():
    embeddings = model.encode(samples)
    CATEGORY_EMBEDDINGS[category] = np.mean(embeddings, axis=0)

def classify_with_embeddings(text: str):
    text_embedding = model.encode([text])[0]

    best_category = None
    best_score = 0.0

    for category, cat_embedding in CATEGORY_EMBEDDINGS.items():
        score = cosine_similarity(
            [text_embedding],
            [cat_embedding]
        )[0][0]

        if score > best_score:
            best_score = score
            best_category = category

    return {
        "category": best_category,
        "confidence": float(best_score)
    }
