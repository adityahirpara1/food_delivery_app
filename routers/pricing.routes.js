import {createTable, insertData } from "../controllers/pricing.controller.js";
import express from 'express';
const router = express.Router();

router.post("/createTable", createTable);
router.post("/insertData",insertData);
  
export default  router;

