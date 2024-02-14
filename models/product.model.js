const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.description = productData.description;
    this.price = +productData.price;
    this.image = productData.image; // the name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;

    if (productData._id) {
      this._id = productData._id.toString();
    }
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
    };
    const result = await db
      .getDb()
      .collection("products")
      .insertOne(productData);
  }
}

module.exports = Product;
