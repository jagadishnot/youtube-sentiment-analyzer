import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import analyzeRoute from './routes/analyze.js';



const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use('/api/analyze', analyzeRoute);

/* HEALTH CHECK */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running 🚀' });
});

/* ROOT */
app.get('/', (req, res) => {
  res.send('🚀 YouTube Sentiment Analyzer API running');
});

/* START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});