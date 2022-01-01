const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;
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
  console.log("database connected");
  const userCollection = client.db("eRMG").collection("users");
  const materialPartsCollection = client
    .db("eRMG")
    .collection("materialsParts");
  const RFQCollection = client.db("eRMG").collection("totalRFQ");

  app.post("/addUser", (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    userCollection.insertOne(newUser).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/getUser", (req, res) => {
    const newUser = req.body;
    userCollection.find().then((result) => {
      res.send(result);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hero Rider Server Is Running!");
});

app.listen(port, () => {
  console.log(`${port}`);
});
