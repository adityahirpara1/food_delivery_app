import express from 'express';

import itemsRoutes from "./routers/items.routes.js";
import organizationRoutes from "./routers/organization.routes.js";
import pricingRoutes from "./routers/pricing.routes.js";

const app = express();


app.use(express.json());
app.use("/items",itemsRoutes);
app.use("/organization",organizationRoutes);
app.use("/pricing",pricingRoutes);


app.post('/calculate_delivery_cost', async (req, res) => {
  const { organization_id, item_id, zone, distance } = req.body;

  try {
    // Retrieve pricing information from the database
    const result = await pool.query('SELECT * FROM Pricing WHERE organization_id = $1 AND item_id = $2 AND zone = $3', [organization_id, item_id, zone]);
    const pricing = result.rows[0];
    console.log("::::::::::::::result", result);
    /*
    ::::::::::::::result Result {
command: 'SELECT',
rowCount: 0,
oid: null,
rows: [],
fields: [
Field {
  name: 'id',
  tableID: 16462,
  columnID: 1,
  dataTypeID: 23,
  dataTypeSize: 4,
  dataTypeModifier: -1,
  format: 'text'
},
Field {
  name: 'organization_id',
  tableID: 16462,
  columnID: 2,
  dataTypeID: 23,
  dataTypeSize: 4,
  dataTypeModifier: -1,
  format: 'text'
},
Field {
  name: 'item_id',
  tableID: 16462,
  columnID: 3,
  dataTypeID: 23,
  dataTypeSize: 4,
  dataTypeModifier: -1,
  format: 'text'
},
Field {
  name: 'zone',
  tableID: 16462,
  columnID: 4,
  dataTypeID: 1043,
  dataTypeSize: -1,
  dataTypeModifier: 259,
  format: 'text'
},
Field {
  name: 'base_distance_km',
  tableID: 16462,
  columnID: 5,
  dataTypeID: 701,
  dataTypeSize: 8,
  dataTypeModifier: -1,
  format: 'text'
},
Field {
  name: 'base_price',
  tableID: 16462,
  columnID: 6,
  dataTypeID: 701,
  dataTypeSize: 8,
  dataTypeModifier: -1,
  format: 'text'
},
Field {
  name: 'per_km_price',
  tableID: 16462,
  columnID: 7,
  dataTypeID: 701,
  dataTypeSize: 8,
  dataTypeModifier: -1,
  format: 'text'
}
],
_parsers: [
[Function: parseInteger],
[Function: parseInteger],
[Function: parseInteger],
[Function: noParse],
[Function: parseFloat],
[Function: parseFloat],
[Function: parseFloat]
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
_prebuiltEmptyResultObject: {
id: null,
organization_id: null,
item_id: null,
zone: null,
base_distance_km: null,
base_price: null,
per_km_price: null
}
}
    */
    console.log("::::::::::::::pricing", !pricing);

    if (!pricing) {
      return res.status(404).json({ error: "Pricing not found for the provided parameters" });
    }
    let total_cost = pricing.base_price;
    if (distance > pricing.base_distance_km) {
      const additionalDistance = distance - pricing.base_distance_km;
      total_cost += additionalDistance * pricing.per_km_price;
    }
    total_cost = total_cost / 100; 
    res.json({ total_cost: total_cost });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
mkdir food-delivery-api
cd food-delivery-api
npm init -y
npm install express pg

 */