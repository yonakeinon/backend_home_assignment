import express from 'express';
import { getVendors, addVendor } from '../services/vendorService';
import { checkVendorData } from '../models/vendor';
import { fetchExternalProcurementData, createProcurementsForVendor } from '../services/procurementService';

const router = express.Router();

// Get all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await getVendors();
        res.json(vendors);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Add a new vendor
router.post('/', async (req, res) => {
    try {
        const validationError = checkVendorData(req.body);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }
        const newVendor = await addVendor(req.body);
        res.status(201).json(newVendor);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Create procurements for a specific vendor
router.post('/:id/procurements', async (req, res) => {
    const vendorId = req.params.id;

    try {
        // Fetch external data and create procurements
        const externalData = await fetchExternalProcurementData();
        const procurements = await createProcurementsForVendor(vendorId, externalData);

        res.status(201).json({
            vendorId,
            procurements,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error creating procurements for vendor ${vendorId}:`, error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

export default router;
