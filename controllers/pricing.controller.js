import { pool } from '../databse/postgresql.db.connection.js';

const tableCreateQuery = 'CREATE TABLE Pricing(id SERIAL PRIMARY KEY,organization_id TEXT ,item_id INT ,zone VARCHAR(255) NOT NULL,base_distance_in_km FLOAT NOT NULL,base_price FLOAT NOT NULL,per_km_price FLOAT NOT NULL)'
const insertDataQuery = 'INSERT into Pricing(organization_id,item_id,zone,base_distance_in_km,base_price,per_km_price) VALUES($1, $2,$3,$4,$5,$6) RETURNING id'



export const createTable = async (req, res) => {
    try {
        const pricingTable = await pool.query(tableCreateQuery);
        res.send("daman item");
    } catch (error) {
        res.send("sfdgsdafgdfgbsdfbh");
    }
};


export const insertData = async (req, res) => {
    const { id, zone, organization_id, total_distance, item_type } = req.body;
    try {
        const item123 = await pool.query(
            'SELECT * FROM Item WHERE type = $1',
            [item_type]
        );
        const item_id = item123.rows[0].id;
        const base_distance_in_km = 5;
        const per_km_price = 1.5;
        const base_price = 10;
        let total_price = base_price;
        if (total_distance > base_distance_in_km) {
          const additionalDistance = total_distance - base_distance_in_km;
          total_price += additionalDistance * per_km_price;
        }
        total_price = Math.floor(total_price);
        const insertData = await pool.query(
            insertDataQuery,
            [organization_id,item_id,zone,base_distance_in_km,base_price,per_km_price],
        );
        res.status(201).json({
            data: total_price
        });
    } catch (error) {
        console.log(error);
        res.send("error");
    }
};

/*
::::::::::::item123 Result {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [
    {
      id: 1,
      type: 'perishable',
      description: 'A samosa is a fried South Asian pastry with a savoury filling, including ingredients such as spiced potatoes, onions, peas, meat, or fish. It is made into different shapes'
    }
  ],
  fields: [
    Field {
      name: 'id',
      tableID: 16559,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    },
    Field {
      name: 'type',
      tableID: 16559,
      columnID: 2,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 259,
      format: 'text'
    },
    Field {
      name: 'description',
      tableID: 16559,
      columnID: 3,
      dataTypeID: 25,
      dataTypeSize: -1,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [
    [Function: parseInteger],
    [Function: noParse],
    [Function: noParse]
  ],
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
  _prebuiltEmptyResultObject: { id: null, type: null, description: null }
}
error: column "organization_id" of relation "item" does not exist
    at E:\postsql\food deliveery app\node_modules\pg-pool\index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async insertData (file:///E:/postsql/food%20deliveery%20app/controllers/pricing.controller.js:31:28) {
  length: 132,
  severity: 'ERROR',
  code: '42703',
  detail: undefined,
  hint: undefined,
  position: '19',
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'parse_target.c',
  line: '1057',
  routine: 'checkInsertTargets'
}

*/