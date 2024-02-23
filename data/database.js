require("dotenv").config();
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

// let mongodbUrl = "mongodb://localhost:27017";
let mongodbUrl = process.env.MONGODB_URI;

console.log("MongoDb: ", process.env.MONGODB_URI);
if (process.env.MONGODB_URI) {
  mongodbUrl = process.env.MONGODB_URI;
}

let database;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongodbUrl);
    database = client.db("online-shop");
    console.log("connected to mongodb successfully: " + mongodbUrl);
  } catch (error) {
    console.log(`this is the mongourl: ${mongodbUrl}
    Database is not connecting... ${error}`);
  }
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
