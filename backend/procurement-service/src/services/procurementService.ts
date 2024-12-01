import { Pool } from 'pg';
import { Procurement } from '../models/procurement';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'procurement_db',
    password: 'password',
    port: 5432,
});

export const getProcurements = async (): Promise<Procurement[]> => {
    const result = await pool.query('SELECT * FROM procurements');
    return result.rows;
};

export const addProcurement = async (procurement: Partial<Procurement>): Promise<Procurement> => {
    const { title, description, items, status } = procurement;
    const result = await pool.query(
        'INSERT INTO procurements (title, description, items, status, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, JSON.stringify(items), status || 'open', new Date()]
    );
    return result.rows[0];
};