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

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("../views/admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  // console.log(req.body.title) /// it is showing undefined
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    // replace the old image with new image
    product.replaceImage(req.file.filename);
  }
  try {
    // console.log(product);
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  const productId = req.params.id;
  // console.log(productId);

  try {
    await Product.delete(productId);
  } catch (error) {
    next(error);
    console.log("product deleted successfully2");
    console.log(error);
  }

  // without using jsx
  // res.redirect("/admin/products");

  // using jsx
  res.json({ message: "Deleted product!" });
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
