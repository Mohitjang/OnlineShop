const express = require("express");
const cartControllers = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cartControllers.getCart); // /cart

router.post("/item", cartControllers.addCartItem); // /cart/item

router.patch("/item", cartControllers.updateCartItem);

module.exports = router;
