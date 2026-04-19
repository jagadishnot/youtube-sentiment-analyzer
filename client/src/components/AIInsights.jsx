import React from "react";

function AIInsights({ summary }) {
  if (!summary) return null;

  const { positivePct, negativePct, neutralPct } = summary;

  // 🎯 Better tone logic
  let tone = "⚖ Mixed";
  if (positivePct >= 70) tone = "🔥 Highly Positive";
  else if (positivePct >= 50) tone = "😊 Mostly Positive";
  else if (negativePct >= 50) tone = "⚠ Critical";
  else if (neutralPct >= 50) tone = "😐 Neutral";

  // 🧠 Smart feedback (frontend-generated AI feel)
  let feedback = "";

  if (positivePct >= 70) {
    feedback =
      "Audience strongly appreciates this content. High engagement and satisfaction are clearly visible.";
  } else if (positivePct >= 50) {
    feedback =
      "Most viewers responded positively, indicating good content quality with minor mixed opinions.";
  } else if (negativePct >= 50) {
    feedback =
      "Audience shows dissatisfaction. This content may need improvement or better engagement.";
  } else if (neutralPct >= 50) {
    feedback =
      "Audience reactions are mostly neutral, suggesting moderate engagement without strong opinions.";
  } else {
    feedback =
      "Audience feedback is balanced with both positive and negative reactions.";
  }

  return (
    <div className="ai-box">
      <h3>🤖 AI Insights</h3>

      {/* 🔥 Tone */}
      <p>
        <strong>Overall Tone:</strong> {tone}
      </p>

      {/* 📊 Percent Breakdown */}
      <div className="ai-stats">
        <span className="badge positive">😊 {positivePct}% Positive</span>
        <span className="badge neutral">😐 {neutralPct}% Neutral</span>
        <span className="badge negative">😡 {negativePct}% Negative</span>
      </div>

      {/* 🧠 Feedback */}
      <p className="ai-text">{feedback}</p>

      {/* 👍 Top Positive */}
      {summary.topPositiveComment && (
        <div className="ai-positive">
          <strong>👍 Top Positive:</strong>
          <p>{summary.topPositiveComment}</p>
        </div>
      )}

      {/* 👎 Top Negative */}
      {summary.topNegativeComment && (
        <div className="ai-negative">
          <strong>👎 Top Negative:</strong>
          <p>{summary.topNegativeComment}</p>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
