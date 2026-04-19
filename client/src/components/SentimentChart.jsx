import React from "react";
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
  CartesianGrid,
  Legend,
} from "recharts";

function SentimentChart({ summary }) {
  if (!summary) return null;

  // 📊 Data
  const pieData = [
    { name: "Positive", value: summary.positivePct },
    { name: "Neutral", value: summary.neutralPct },
    { name: "Negative", value: summary.negativePct },
  ];

  const barData = [
    { name: "Positive", value: summary.positivePct },
    { name: "Neutral", value: summary.neutralPct },
    { name: "Negative", value: summary.negativePct },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  // 🎯 Custom label
  const renderLabel = ({ name, percent }) =>
    `${name} ${(percent * 100).toFixed(0)}%`;

  return (
    <div className="chart-container">
      
      {/* 🔥 PIE CHART */}
      <div className="chart-box">
        <h4 className="chart-title">Sentiment Distribution</h4>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="grad2">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="grad3">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>

            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={3}
              label={renderLabel}
              animationDuration={1200}
            >
              <Cell fill="url(#grad1)" />
              <Cell fill="url(#grad2)" />
              <Cell fill="url(#grad3)" />
            </Pie>

            <Tooltip contentStyle={{ borderRadius: "10px" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 BAR CHART */}
      <div className="chart-box">
        <h4 className="chart-title">Sentiment Comparison</h4>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            >
              <Cell fill="#22c55e" />
              <Cell fill="#eab308" />
              <Cell fill="#ef4444" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🧠 Summary */}
      <p className="chart-summary">{summary.overallFeedback}</p>
    </div>
  );
}

export default SentimentChart;
