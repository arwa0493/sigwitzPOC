const {apiPath} = require('../constant');
const express = require("express");
const routers = express.Router();
const {
  SalesApis,
} = require('../controllers');
routers.post(
    apiPath.sales.add,
    SalesApis.add
);
routers.get(
    apiPath.sales.getStats,
    SalesApis.getStats
);
module.exports = routers;
