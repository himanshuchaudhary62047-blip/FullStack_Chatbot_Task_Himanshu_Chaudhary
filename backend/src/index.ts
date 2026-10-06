import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiryRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use('/api/enquiries', enquiryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'DroneTV Backend API (MongoDB)' });
});

// Global 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Global error middleware
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 DroneTV Backend Server running on http://localhost:${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${PORT} is already in use by another instance. The backend is already active.`);
    } else {
      console.error('Server startup error:', err.message);
    }
  });
};

startServer();
