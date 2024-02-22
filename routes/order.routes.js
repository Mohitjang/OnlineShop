const express = require("express");
const orderControllers = require("../controllers/order.controller");

const router = express.Router();

router.post("/", orderControllers.addOrder); // /order

router.get("/", orderControllers.getOrders); // /order


module.exports = router;
