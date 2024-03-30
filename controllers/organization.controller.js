import {pool} from '../databse/postgresql.db.connection.js';

const tableCreateQuery = 'CREATE TABLE Item (id INT PRIMARY KEY,name VARCHAR(255) NOT NULL)'
const insertDataQuery = 'INSERT into item (id,name) VALUES($1, $2) RETURNING id'


export const createTable = async (req, res) => {
    try {
        const organizationTable = await pool.query(tableCreateQuery);
        res.send("daman item");
    } catch (error) {
        res.send("error");
    }
};


export const insertData = async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertData = await pool.query(
            insertDataQuery,
            [id, name],
        );
        res.send("daman item");
    } catch (error) {
        res.send("error");
    }
};