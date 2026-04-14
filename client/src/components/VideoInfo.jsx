import React from 'react';

function VideoInfo({ meta }) {
  if (!meta) return null;

  // 🔢 Format numbers (1K, 1M)
  const formatNumber = (n) =>
    n >= 1_000_000
      ? (n / 1_000_000).toFixed(1) + 'M'
      : n >= 1_000
      ? (n / 1_000).toFixed(1) + 'K'
      : n;

  // 📅 Format date
  const published = new Date(meta.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="video-card">

      {/* 🎬 Thumbnail */}
      <div className="thumbnail-wrapper">
        <img
          src={meta.thumbnailUrl}
          alt="thumbnail"
          className="thumbnail-img"
        />
        <div className="play-overlay">▶</div>
      </div>

      {/* 📄 Content */}
      <div className="video-content">

        <h3 className="video-title">{meta.title}</h3>

        <p className="video-sub">
          {meta.channelTitle} • {published}
        </p>

        {/* 📊 Stats */}
        <div className="stats-container">
          <span className="stat-chip">⏱ {meta.duration}</span>
          <span className="stat-chip">👁 {formatNumber(meta.viewCount)}</span>
          <span className="stat-chip">👍 {formatNumber(meta.likeCount)}</span>
          <span className="stat-chip">💬 {formatNumber(meta.commentCount)}</span>

          {/* ⚠ Ads */}
          {meta.hasAds && (
            <span className="ad-chip">
              ⚠ Sponsored Content
            </span>
          )}
        </div>

        {/* 📜 Description */}
        {meta.description && (
          <p className="video-desc">
            {meta.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoInfo;