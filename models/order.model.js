const db = require("../data/database");
const mongodb = require("mongodb");
const User = require("./user.model");

class Order {
  // status= pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    if (orderId) {
      this.id = orderId;
    }
  }

  async save() {
    if (this.id) {
      // updating the status of order by admin
      const orderId = new mongodb.ObjectId(this.id);
      return await db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      //creating the new order
      const orderDocument = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };
      return await db.getDb().collection("orders").insertOne(orderDocument);
    }
  }

  static transformOrderDocument(orderDoc) {
    // console.log(orderDoc);
    // console.log(orderDoc.productData.items);
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);
    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    //   console.log(orders)
    // list of orders of single user
    // but we want to send one order data at one time so instead of doing it here we can do it in other function:-
    return this.transformOrderDocuments(orders);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();
    // list of all users orders for admin
    // but we want to send one order data at one time so instead of doing it here we can do it in other function:-
    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(orderId) });
    //   console.log(order)
    return this.transformOrderDocument(order);
  }
}

module.exports = Order;
