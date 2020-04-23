require("dotenv").config();
const mongodb = require("mongodb");

// CRUD create read update delete

const MongoClient = mongodb.MongoClient;

const user = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const authMechanism = "DEFAULT";

// Connection URL
const connectionURL = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`;
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    db.collection("users").insertOne({
      name: "Sulthon",
      age: 21,
    });
  }
);
