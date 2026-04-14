import React, { useState } from 'react';
import VideoInput from './components/VideoInput';
import VideoInfo from './components/VideoInfo';
import SentimentChart from './components/SentimentChart';
import CommentList from './components/CommentList';
import AIInsights from './components/AIInsights';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('https://yt-backend-mxrd.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      {/* 🔥 HEADER */}
      <header className="app-header">
        <h1 className="app-title">
          🎥 YouTube Sentiment Analyzer
        </h1>
        <p className="app-subtitle">
          Analyze audience reactions, detect sentiment, and uncover insights instantly.
        </p>
      </header>

      {/* 🔍 INPUT */}
      <div className="glass-card">
        <VideoInput onAnalyze={handleAnalyze} loading={loading} />
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="loading-box">
          🚀 Fetching video data & analyzing comments...
        </div>
      )}

      {/* ❌ ERROR */}
      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}

      {/* ✅ RESULT */}
      {result && (
        <>
          {/* 🎥 VIDEO PLAYER */}
          <div className="glass-card video-player-card">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${result.videoMeta.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-player"
            ></iframe>
          </div>

          {/* 🎬 VIDEO INFO */}
          <div className="glass-card">
            <VideoInfo meta={result.videoMeta} />
          </div>

          {/* 📊 SENTIMENT + AI */}
          <div className="glass-card">
            <h3 className="section-title">📊 Sentiment Analysis</h3>

            <SentimentChart
              summary={result.sentimentSummary}
              comments={result.comments}
            />

            {/* 🤖 AI INSIGHTS */}
            <AIInsights summary={result.sentimentSummary} />

            {result.message && (
              <p className="info-text">{result.message}</p>
            )}
          </div>

          {/* 💬 COMMENTS */}
          {result.comments.length > 0 && (
            <div className="glass-card">
              <h3 className="section-title">
                💬 Comments ({result.comments.length})
              </h3>

              <CommentList comments={result.comments} />
            </div>
          )}
        </>
      )}

      {/* 👤 FOOTER (PERSONAL BRANDING) */}
      <footer className="app-footer">
        <div className="footer-content">
          <h3>✨ Built with ❤️ by Jagadish Gow</h3>

          <p>
            🚀 Full Stack Developer | AI Enthusiast
          </p>

          <div className="footer-links">
            <a
              href="https://www.instagram.com/jagad.ish07?igsh=ZWFpYmtoaDFnaGtq"
              target="_blank"
              rel="noreferrer"
            >
              📸 Instagram
            </a>

            <a
              href="https://github.com/jagadishnot"
              target="_blank"
              rel="noreferrer"
            >
              💻 GitHub
            </a>

            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noreferrer"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
