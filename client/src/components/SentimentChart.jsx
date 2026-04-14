import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

function SentimentChart({ summary }) {
  if (!summary) return null;

  const pieData = [
    { name: 'Positive', value: summary.positivePct },
    { name: 'Neutral', value: summary.neutralPct },
    { name: 'Negative', value: summary.negativePct },
  ];

  const barData = [
    { name: 'Positive', value: summary.positive },
    { name: 'Neutral', value: summary.neutral },
    { name: 'Negative', value: summary.negative },
  ];

  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <div>
      {/* 🔥 PIE CHART */}
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              animationDuration={800}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 BAR CHART */}
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🧠 Summary */}
      <p className="video-desc">{summary.overallFeedback}</p>
    </div>
  );
}

export default SentimentChart;