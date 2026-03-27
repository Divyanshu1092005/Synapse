import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB connected');

app.listen(process.env.PORT || 5000, () => {
  console.log(`API running on port ${process.env.PORT || 5000}`);
});