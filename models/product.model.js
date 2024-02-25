const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.description = productData.description;
    this.price = +productData.price;
    this.image = productData.image; // the name of the image file
    this.imageUrl = productData.imageUrl;
    // this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("could not find product by id.");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async findAll() {
    const productsArray = await db
      .getDb()
      .collection("products")
      .find()
      .toArray();
    return productsArray.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
      imageUrl: this.imageUrl,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
        delete productData.imageUrl;
      }

      const result = await db.getDb().collection("products").updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
      console.log("product updated successfully!");
    } else {
      const result = await db
        .getDb()
        .collection("products")
        .insertOne(productData);
      console.log("product added successfully!");
    }
  }

  // updateImageData() {
  //   // this.imagePath = `product-data/images/${this.image}`;
  //   this.imageUrl = `/products/assets/images/${this.image}`;
  //   // here we have to put the cloudinary related path
  // }

  replaceImage(newImage, newImageUrl) {
    this.image = newImage;
    this.imageUrl = newImageUrl;
  }

  static async delete(prodId) {
    let productId;
    try {
      productId = new mongodb.ObjectId(prodId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    await db.getDb().collection("products").deleteOne({ _id: productId });

    console.log("product deleted successfully!");
  }
}

module.exports = Product;
