import {pool} from '../databse/postgresql.db.connection.js';

const tableCreateQuery = 'CREATE TABLE Item (id INT PRIMARY KEY,type VARCHAR(255) NOT NULL,description TEXT)'
const insertDataQuery = 'INSERT into item (id,type,description) VALUES($1, $2, $3) RETURNING id'


export const createTable = async (req, res) => {
    try {
        const itemsTable = await pool.query(tableCreateQuery);
        res.send("daman item");
    } catch (error) {
        res.send("error");
    }
};

export const insertData = async (req, res) => {
    const { id, item_type, item_description } = req.body;
    try {
        const insertData = await pool.query(
            insertDataQuery,
            [id, item_type, item_description],
        );
        res.send("daman item");
    } catch (error) {
        res.send("error");
    }
};

/*
const tableCreateQuery = 'CREATE TABLE Item (id INT PRIMARY KEY,type VARCHAR(255) NOT NULL,description TEXT)'

Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [ { id: 1 } ],
  fields: [
    Field {
      name: 'id',
      tableID: 16559,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [ [Function: parseInteger] ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false,
  _prebuiltEmptyResultObject: { id: null }
}
*/


/*
BoundPool {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  options: {
    user: 'postgres',
    host: 'localhost',
    database: 'daman',
    port: 5432,
    max: 10,
    maxUses: Infinity,
    allowExitOnIdle: false,
    maxLifetimeSeconds: 0,
    idleTimeoutMillis: 10000
  },
  log: [Function (anonymous)],
  Client: [class Client extends EventEmitter] {
    Query: [class Query extends EventEmitter]
  },
  Promise: [Function: Promise],
  _clients: [],
  _idle: [],
  _expired: WeakSet { <items unknown> },
  _pendingQueue: [],
  _endCallback: undefined,
  ending: false,
  ended: false,
  [Symbol(kCapture)]: false
}

*/