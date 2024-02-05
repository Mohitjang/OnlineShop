function getProducts(req, res) {
  res.render("customer/products/all-products");
  return;
}

module.exports = {
  getProducts: getProducts,
};
