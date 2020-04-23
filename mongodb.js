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

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5ea1e280969b750ff0fe6819"),
    //     },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
