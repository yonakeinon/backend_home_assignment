import express from 'express';
import vendorRoutes from './controllers/vendorController';

const app = express();

// Middleware
app.use(express.json()); // Parses JSON request bodies

// Routes
app.use('/vendors', vendorRoutes);

export default app;
