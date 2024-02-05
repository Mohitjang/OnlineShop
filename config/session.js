const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

// creating session store NOT session:- so we need express session as an agument in this.
function createSessionStore() {
  const MongoDbStore = mongoDbStore(session);

  //   initialize new store object using mongodbstore constructor which is given by package:-
  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: "super-secret",
    resave: true,
    saveUninitialized: true,
    store: createSessionStore(),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    },
  };
}

module.exports = createSessionConfig;
