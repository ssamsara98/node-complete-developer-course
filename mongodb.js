require("dotenv").config();
const mongodb = require("mongodb");

// CRUD create read update delete

const { MongoClient, ObjectID } = mongodb;

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

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5ea1e3c8f524672d2c276bed") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5ea1e6fbeab5e02a983f61c1") },
      (error, task) => {
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });
  }
);
