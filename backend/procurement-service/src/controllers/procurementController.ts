import express from 'express';
import { getProcurements, addProcurement, getProcurementsByQuantity, getProcurementsByStatus } from '../services/procurementService';
import { fetchExternalData } from '../services/externalApiService'; // Import the new service
import { ProcurementStatus } from '../models/ProcurementStatus';


const router = express.Router();

// GET /api/procurements
router.get('/', async (req, res) => {
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

// POST /api/procurements
router.post('/', async (req, res) => {
    try {
        const procurement = await addProcurement({
            ...req.body,
            status: ProcurementStatus.OPEN,
        });
        res.status(201).json(procurement);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating procurement:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// GET /api/external-data
router.get('/external-data', async (req, res) => {
    try {
        const data = await fetchExternalData();
        res.json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching external data:', error);
            res.status(500).json({ error: 'Failed to fetch external data' });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});


// Filter procurements by quantity
router.get('/filter-by-quantity', async (req, res) => {
    const minQuantity = parseInt(req.query.minQuantity as string, 10);

    if (isNaN(minQuantity) || minQuantity < 0) {
        return res.status(400).json({ error: 'Invalid minQuantity parameter. It must be a positive integer.' });
    }

    try {
        const procurements = await getProcurementsByQuantity(minQuantity);
        if (procurements.length === 0) {
            return res.status(404).json({ message: 'No procurements found with items greater than the specified quantity.' });
        }
        res.json(procurements);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error filtering procurements by quantity:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Filter procurements by status
router.get('/filter-by-status', async (req, res) => {
    const { status } = req.query;

    if (!status) {
        return res.status(400).json({ error: 'Missing required query parameter: status' });
    }

    try {
        const procurements = await getProcurementsByStatus(status as string);
        if (procurements.length === 0) {
            return res.status(404).json({ message: `No procurements found with status: ${status}` });
        }
        res.json(procurements);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error filtering procurements by status:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});



export default router;
