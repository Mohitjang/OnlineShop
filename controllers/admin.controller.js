const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();

    res.render("../views/admin/products/all-products.ejs", {
      products: products,
    });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render("../views/admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  const productData = {
    ...req.body,
    image: req.file.filename,
  };

  const newProduct = new Product(productData);
  // console.log(req.body);
  // console.log(req.file);
  try {
    await newProduct.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
