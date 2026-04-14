from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import re

app = Flask(__name__)
CORS(app)

# 🔥 HuggingFace API
HF_API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"

headers = {
    "Authorization": f"Bearer {os.getenv('HF_TOKEN')}"
}

LABEL_MAP = {
    "POSITIVE": "positive",
    "NEGATIVE": "negative"
}


# ✅ Clean text
def clean_text(text):
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:512]


# 🔥 SAFE HF API CALL
def analyze_texts(texts):
    response = requests.post(
        HF_API_URL,
        headers=headers,
        json={"inputs": texts}
    )

    data = response.json()

    # 🔥 HANDLE ALL ERROR CASES
    if isinstance(data, dict):
        if "error" in data:
            raise Exception(f"HuggingFace Error: {data['error']}")
        if "estimated_time" in data:
            raise Exception("Model is loading, try again in few seconds")

    return data


# ✅ Generate AI summary
def generate_overall_feedback(pos_pct, neg_pct, neu_pct, top_positive, top_negative):
    dominant = max(
        [("positive", pos_pct), ("negative", neg_pct), ("neutral", neu_pct)],
        key=lambda x: x[1],
    )[0]

    if dominant == "positive":
        tone = "overwhelmingly positive" if pos_pct > 70 else "mostly positive"
    elif dominant == "negative":
        tone = "mostly critical" if neg_pct > 50 else "mixed with criticism"
    else:
        tone = "balanced and mixed"

    summary = f"Audience reception is {tone} ({pos_pct:.0f}% positive, {neg_pct:.0f}% negative, {neu_pct:.0f}% neutral). "

    if top_positive:
        summary += f'Viewers praise things like: "{top_positive}". '

    if top_negative:
        summary += f'Common criticism includes: "{top_negative}".'

    return summary.strip()


# ✅ MAIN API
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        texts = data.get("texts", [])

        if not texts:
            return jsonify({"error": "No texts provided"}), 400

        cleaned = [clean_text(t) for t in texts]

        # 🔥 CALL HF API
        raw_results = analyze_texts(cleaned)

        results = []
        counts = {"positive": 0, "negative": 0, "neutral": 0}
        scores = {"positive": [], "negative": [], "neutral": []}

        for item in raw_results:
            if isinstance(item, list):
                item = item[0]

            # 🔥 SAFETY CHECK
            if not isinstance(item, dict):
                continue

            if "label" not in item:
                continue

            label_raw = item["label"]
            label = LABEL_MAP.get(label_raw, "neutral")
            score = round(item.get("score", 0), 4)

            results.append({"label": label, "score": score})

            counts[label] += 1
            scores[label].append(score)

        total = len(results)

        if total == 0:
            return jsonify({"error": "No valid results from model"}), 500

        pos_pct = (counts["positive"] / total) * 100
        neg_pct = (counts["negative"] / total) * 100
        neu_pct = (counts["neutral"] / total) * 100

        # 🔥 Best comments
        pos_indices = [i for i, r in enumerate(results) if r["label"] == "positive"]
        neg_indices = [i for i, r in enumerate(results) if r["label"] == "negative"]

        top_positive = ""
        top_negative = ""

        if pos_indices:
            best_pos_idx = max(pos_indices, key=lambda i: results[i]["score"])
            top_positive = cleaned[best_pos_idx][:120]

        if neg_indices:
            best_neg_idx = max(neg_indices, key=lambda i: results[i]["score"])
            top_negative = cleaned[best_neg_idx][:120]

        overall_feedback = generate_overall_feedback(
            pos_pct, neg_pct, neu_pct, top_positive, top_negative
        )

        avg_positive_score = round(
            sum(scores["positive"]) / len(scores["positive"]),
            3
        ) if scores["positive"] else 0

        summary = {
            "total": total,
            "positive": counts["positive"],
            "negative": counts["negative"],
            "neutral": counts["neutral"],
            "positivePct": round(pos_pct, 1),
            "negativePct": round(neg_pct, 1),
            "neutralPct": round(neu_pct, 1),
            "avgPositiveScore": avg_positive_score,
            "overallFeedback": overall_feedback,
            "topPositiveComment": top_positive,
            "topNegativeComment": top_negative,
        }

        return jsonify({
            "results": results,
            "summary": summary
        })

    except Exception as e:
        print("ERROR:", str(e))  # 👈 helps debugging in Render logs
        return jsonify({"error": str(e)}), 500


# ✅ Health check
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# ✅ Run server
if __name__ == "__main__":
    app.run(port=5001, debug=True)
