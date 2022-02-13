const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
// const ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5050;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gbf8e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log(err);
  const collection = client.db("AshaIT").collection("services");
  // console.log(collection);
  app.get("/services", (req, res) => {
    collection.find({}).toArray((err, service) => {
      res.send(service);
    });
  });
  // client.close();
});

// client.connect((err) => {
//   console.log(uri);
//   const userCollection = client.db("AshaIT").collection("users");
//   // const adminCollection = client.db("heroRider").collection("admin");
//   const adminCollection = client.db("AshaIT").collection("admins");
//   const serviceCollection = client.db("AshaIT").collection("services");

//   app.post("/addUser", (req, res) => {
//     const newUser = req.body;
//     console.log(newUser);
//     userCollection.insertOne(newUser).then((result) => {
//       res.send(result.insertedCount > 0);
//     });
//   });
//   app.get("/services", (req, res) => {
//     // serviceCollection.find({}).toArray((err, service) => {
//     //   res.send(service);
//     // });
//     res.send("hello");
//   });

//   app.post("/addAdmin", (req, res) => {
//     const newAdmin = req.body;
//     adminCollection.insertOne(newAdmin).then((result) => {
//       res.send(result.insertedCount > 0);
//     });
//   });

//   app.get("/isAdmin/:email", (req, res) => {
//     adminCollection.find({ email: req.params.email }).toArray((err, docs) => {
//       res.send(docs.length > 0);
//       console.log(docs);
//     });
//   });

//   app.get("/getUser", (req, res) => {
//     console.log("request is comming");
//     userCollection.find().then((result) => {
//       res.send(result);
//     });
//   });
// });

app.get("/", (req, res) => {
  res.send("Hero Rider Server Is Running!");
});

app.listen(port, () => {
  console.log(`${port}`);
});
