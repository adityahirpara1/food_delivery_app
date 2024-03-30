import pkg from 'pg';
const { Pool } = pkg;
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'daman',
    password: '123456789',
    port: 5432,
});