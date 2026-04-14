import React from 'react';

function AIInsights({ summary }) {
  if (!summary) return null;

  const tone =
    summary.positivePct > 60
      ? '🔥 Very Positive'
      : summary.negativePct > 50
      ? '⚠ Critical'
      : '⚖ Mixed';

  return (
    <div className="ai-box">
      <h3>🤖 AI Insights</h3>

      <p><strong>Overall Tone:</strong> {tone}</p>

      <p><strong>Audience Feedback:</strong></p>
      <p className="ai-text">{summary.overallFeedback}</p>

      {summary.topPositiveComment && (
        <div className="ai-positive">
          <strong>👍 Top Positive:</strong>
          <p>{summary.topPositiveComment}</p>
        </div>
      )}

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