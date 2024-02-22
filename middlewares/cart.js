const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  // if cart doesnot exist in the session
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  res.locals.cart = cart;
  // console.log("locals cart");
  // console.log(res.locals.cart);
  // console.log("session cart");
  // console.log(req.session.cart);
  next();
}

module.exports = initializeCart;
