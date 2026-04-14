import React from 'react';

function CommentList({ comments }) {
  if (!comments || comments.length === 0) return null;

  return (
    <div>
      {comments.slice(0, 20).map((c, i) => (
        <div key={i} className="comment-item">
          <p>{c.text}</p>

          <span className={`sentiment ${c.sentiment}`}>
            {c.sentiment} ({c.score})
          </span>
        </div>
      ))}
    </div>
  );
}

export default CommentList;