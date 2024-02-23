require("dotenv").config();
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://localhost:27017";

console.log("MongoDb: ",process.env.MONGODB_URI);
if (process.env.MONGODB_URI) {
  mongodbUrl = process.env.MONGODB_URI;
}

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongodbUrl);

  database = client.db("online-shop");
  console.log("connected to mongodb successfully: " + mongodbUrl);
}

function getDb() {
  if (!database) {
    throw new Error("You must connect first!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
