import { Pool } from 'pg';
import { Procurement } from '../models/procurement';
import { ProcurementStatus } from '../models/ProcurementStatus';

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'procurement_db',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const getProcurements = async (): Promise<Procurement[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM procurements');
        return result.rows.map(procurement => ({
            ...procurement,
            createdAt: procurement.createdAt
                ? new Date(procurement.createdAt).toISOString() // Format date to ISO
                : null,
        }));
    } catch (error) {
        console.error('Error fetching procurements:', error);
        throw new Error('Failed to fetch procurements from the database.');
    } finally {
        client.release();
    }
};

export const addProcurement = async (procurement: Partial<Procurement>): Promise<Procurement> => {
    const client = await pool.connect();
    try {
        const { title, description, items, status } = procurement;
        const result = await client.query(
            'INSERT INTO procurements (title, description, items, status, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                title,
                description,
                JSON.stringify(items),
                status || ProcurementStatus.OPEN,
                new Date().toISOString() 
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error adding procurement:', error);
        throw new Error('Failed to add procurement to the database.');
    } finally {
        client.release();
    }
};


// Filter procurements by quantity
export const getProcurementsByQuantity = async (minQuantity: number): Promise<Procurement[]> => {
    const client = await pool.connect();
    try {
        const query = `
            WITH procurement_quantities AS (
                SELECT 
                    p.*,
                    (
                        SELECT COALESCE(SUM((value->>'quantity')::INTEGER), 0)
                        FROM jsonb_array_elements(p.items::jsonb) AS value
                    ) as totalQuantity
                FROM procurements p
            )
            SELECT 
                id,
                title,
                description,
                items,
                status,
                createdAt
            FROM procurement_quantities
            WHERE totalQuantity > $1;
        `;
        
        const result = await client.query(query, [minQuantity]);

        return result.rows.map(procurement => ({
            id: procurement.id.toString(), // Ensure id is a string
            title: procurement.title,
            description: procurement.description,
            items: (procurement.items as { itemName: string; quantity: number }[]).map(item => ({
                itemName: item.itemName,
                quantity: item.quantity,
            })),
            status: procurement.status,
            // Check if createdAt is valid, fallback to a default value
            createdAt: procurement.createdAt
                ? new Date(procurement.createdAt).toISOString()
                : new Date().toISOString(), // Fallback to the current date/time
        }));
    } catch (error) {
        console.error('Error filtering procurements by quantity:', error);
        throw new Error('Failed to filter procurements by quantity.');
    } finally {
        client.release();
    }
};



// Filter procurements by status
export const getProcurementsByStatus = async (status: string): Promise<Procurement[]> => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM procurements WHERE status = $1', [status]);
        return result.rows.map(procurement => ({
            ...procurement,
            createdAt: procurement.createdAt
                ? new Date(procurement.createdAt).toISOString()
                : null,
        }));
    } catch (error) {
        console.error('Error filtering procurements by status:', error);
        throw new Error('Failed to filter procurements by status.');
    } finally {
        client.release();
    }
};


// Cleanup pool
export const cleanup = async () => {
    await pool.end();
};
