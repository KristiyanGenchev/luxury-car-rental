import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/database';

import { currentDateOfExecution } from './common/middlewares';
import { userRoutes } from './routes/userRoutes';
import { carRoutes } from './routes/carRoutes';
import { bookingRoutes } from './routes/bookingRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(currentDateOfExecution); // custom middleware: logs current date

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
console.log(typeof carRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 fallback for undefined routes
app.use((_req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Start the app only if DB connection succeeds
db.init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process with failure code
  });

console.log(typeof userRoutes); // трябва да е 'function'
console.log(userRoutes.name);   // трябва да е 'router'
