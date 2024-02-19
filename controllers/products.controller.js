const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    next(error);
  }
}

async function getProductDetails(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.render("customer/products/product-detail", { product: product });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
