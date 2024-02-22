const Order = require("../models/order.model");
const User = require("../models/user.model");

async function addOrder(req, res, next) {
  const cartData = res.locals.cart;
  // const uid = req.session.user.uid;
  let userDocument;
  try {
    userDocument = await User.getUserById(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  // statuss = "fulfilled";
  // const date = new Date();

  const order = new Order(cartData, userDocument);
  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;
  res.redirect("/orders");
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/order/all-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
