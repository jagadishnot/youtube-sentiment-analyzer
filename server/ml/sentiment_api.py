from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

app = Flask(__name__)
CORS(app)

# 🔥 SIMPLE KEYWORD-BASED SENTIMENT (LIGHTWEIGHT)

# 🔥 POSITIVE WORDS
positive_words = [
    "good", "great", "awesome", "amazing", "love", "excellent",
    "nice", "best", "fantastic", "super", "cool", "wonderful",
    "brilliant", "perfect", "liked", "enjoyed", "impressive",
    "outstanding", "beautiful", "incredible", "masterpiece",
    "fire", "lit", "goosebumps", "mind blowing"
]

# 🔥 NEGATIVE WORDS
negative_words = [
    "bad", "worst", "hate", "terrible", "awful", "boring",
    "poor", "useless", "disappointing", "waste", "cringe",
    "annoying", "pathetic", "trash", "slow", "cheap",
    "fake", "overrated", "underwhelming", "mess",
    "not good", "not nice", "not worth"
]

def analyze_text(text):
    text = text.lower()

    pos_score = sum(word in text for word in positive_words)
    neg_score = sum(word in text for word in negative_words)

    if pos_score > neg_score:
        return "positive", 0.8
    elif neg_score > pos_score:
        return "negative", 0.8
    else:
        return "neutral", 0.5


# ✅ Clean text
def clean_text(text):
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:150]


# ✅ MAIN API
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        texts = data.get("texts", [])

        if not texts:
            return jsonify({"error": "No texts provided"}), 400

        cleaned = [clean_text(t) for t in texts]

        results = []
        counts = {"positive": 0, "negative": 0, "neutral": 0}

        for text in cleaned:
            label, score = analyze_text(text)

            results.append({
                "label": label,
                "score": score
            })

            counts[label] += 1

        total = len(results)

        pos_pct = (counts["positive"] / total) * 100
        neg_pct = (counts["negative"] / total) * 100
        neu_pct = (counts["neutral"] / total) * 100

        summary = {
            "total": total,
            "positivePct": round(pos_pct, 1),
            "negativePct": round(neg_pct, 1),
            "neutralPct": round(neu_pct, 1),
            "overallFeedback": "Lightweight sentiment analysis result"
        }

        return jsonify({
            "results": results,
            "summary": summary
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/")
def home():
    return "🚀 Lightweight ML Service Running"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
