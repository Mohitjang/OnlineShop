const Product = require("../models/product.model");
const Order = require("../models/order.model");

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
  console.log("imageUploadMiddleware is finished:- ");
  console.log("req.file object given by middleware:- ", req.file);

  console.log("create new product is running: ");
  console.log("req.file.filename: ", req.file.filename);
  // console.log("req.imageName: ", req.imageName);
  // console.log("req.cloudinaryUrl: ", req.cloudinaryUrl);
  const productData = {
    ...req.body,
    image: req.file.filename,
    imageUrl: req.file.path,
  };
  // image: req.imageName,
  // imageUrl: req.cloudinaryUrl,

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
    product.replaceImage(req.file.filename, req.file.path);
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
    console.log("product deleted successfully");
    console.log(error);
  }

  // without using jsx
  // res.redirect("/admin/products");

  // using jsx
  res.json({ message: "Deleted product!" });
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/order/admin-orders", { orders: orders });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  // console.log(orderId)
  const newStatus = req.body.newStatus;

  let order;

  try {
    order = await Order.findById(orderId);
    order.status = newStatus;
    order.save();
    res.json({
      message: "status updated!",
      newStatus: order.status,
    });
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getAllOrders: getAllOrders,
  updateOrder: updateOrder,
};
