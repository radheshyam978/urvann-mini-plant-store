import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import plantsRouter from './routes/plants.js';
import categoriesRouter from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urvann';
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || 'http://localhost:5173';

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: ALLOW_ORIGIN }));
app.use(morgan('dev'));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' });
});
app.use('/api/plants', plantsRouter);
app.use('/api/categories', categoriesRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Mongo connect + server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error('MongoDB connection error:', e);
    process.exit(1);
  });
