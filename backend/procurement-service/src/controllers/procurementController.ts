import express from 'express';
import { getProcurements, addProcurement } from '../services/procurementService';

const router = express.Router();

// Get all procurement requests
router.get('/procurements', async (req, res) => {
    try {
        const procurements = await getProcurements();
        res.json(procurements);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
    
});

// Add a new procurement request
router.post('/procurements', async (req, res) => {
    try {
        const newProcurement = await addProcurement(req.body);
        res.status(201).json(newProcurement);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
    
});

export default router;