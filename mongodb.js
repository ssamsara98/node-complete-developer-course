require("dotenv").config();
const mongodb = require("mongodb");

// CRUD create read update delete

const { MongoClient } = mongodb;

// Connection URL
const user = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const authMechanism = "DEFAULT";
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

    // db.collection("users").insertOne(
    //   {
    //     name: "Andrew",
    //     age: 27,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     {
    //       name: "Gunther",
    //       age: 27,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    db.collection("tasks").insertMany(
      [
        {
          description: "Clean the house",
          completed: true,
        },
        {
          description: "Renew inspection",
          completed: false,
        },
        {
          description: "Pot plants",
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }
        console.log(result.ops);
      }
    );
  }
);
