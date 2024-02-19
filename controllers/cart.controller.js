const Product = require("../models/product.model");
const productsController = require("./products.controller");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
}

function getCart(req, res, next) {
  res.render("customer/cart/cart");
}

async function updateCartItem(req, res, next) {
  const productId = req.body.productId;
  const newQuantity = req.body.quantity;

  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(productId, newQuantity);
  console.log("==========================================================");
  console.log(updatedItemData);
  console.log("==========================================================");
  req.session.cart = cart;

  res.status(201).json({
    message: "successfully updated !!!",
    updatedCartData: {
      newTotalItems: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });

  // now i have the productid and new quantity to update the cart:-
  // cartData is stored in session storage:-
  // and after updating the cartData we have to make it available cartData to all the ejs templates.
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
