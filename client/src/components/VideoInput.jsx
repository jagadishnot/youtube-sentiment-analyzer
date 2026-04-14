import React, { useState } from 'react';

function VideoInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    const ytPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;

    if (!ytPattern.test(url)) {
      setError('⚠ Please enter a valid YouTube URL');
      return;
    }

    onAnalyze(url);
  };

  return (
    <div className="input-container">
      <h2 className="input-title">🎥 YouTube Video Analyzer</h2>

      <div className="input-box">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Paste YouTube link..."
          className="input-field"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="analyze-btn"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}

export default VideoInput;