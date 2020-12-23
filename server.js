let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const port = require("dotenv");
const server = require("http").createServer(app);
const { MongoClient } = require("mongodb");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
port.config();

app.get("/", (req, res) => {
  res.status(200).json({ api: "Chat conectTv v4" });
});

var database;
async function connect() {
  if (global.db) return global.db;

  const conn = await MongoClient.connect(
    "mongodb://mongo-pet:nrcpzNx5AlNdrGd9OEAG3KvT7oIqwusmrtq7s7GMugSBX7Fu7PSwnwzeitCYFYPWTy7AVtzzHleLYbGa1rQtHQ==@mongo-pet.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@mongo-pet@retrywrites=false",

    {
      useUnifiedTopology: true,
    }
  );

  if (!conn) return new Error("Falha na conexão");

  global.db = await conn.db("petDb");

  return global.db;
}
app.get("/pets", async (req, res, next) => {
  try {
    const db = await connect();
    res.json(await db.collection("pet").find().toArray());
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});

app.post("/postlog", async (req, res, next) => {
  try {
    const db = await connect();
    db.collection("logs").insertOne(req.body);
    res.json(await { status: "Cadastrado" });
  } catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});
// Connect to Mongoose and set connection variable
// MongoClient.connect(
//   "mongodb://conectedudemonstracao:0aHMcTOvR2Xu1kQpNoI9QHm7LB4qc7vsgQTRfsEBc9u4nT0fPnuq8v9UvSvDDUmwwifKi0Nt08rkBKOGNfaPkg==@conectedudemonstracao.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@conectedudemonstracao@&retrywrites=false",
//   function (err, client) {
//     console.log("Connected successfully to server");
//     const db = client.db("logsNiteroi");
//     var data = db.collection("faq");
//     console.log(data);
//     database = db;
//   }
// );

// var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/123123", (req, res) => {
  // const data = await database.collection("logs").find();
  // .then(() => {})
  // .catch((err) => console.log(err));
  res.status(200).json(database.collection("logs").find());
});
// app.post("/postlog", (req, res) => {
//   db.collection("logs")
//     .insertOne(req.body)
//     .then(() => {})
//     .catch((err) => console.log(err));
//   res.status(200).json({ status: "Cadastrado" });
// });

app.post("/postfaq", (req, res) => {
  db.collection("faq")
    .insertOne(req.body)
    .then(() => {})
    .catch((err) => console.log(err));
  res.status(200).json({ status: "Cadastrado" });
});
// app.listen(3000, function () {
//   console.log("Running RestHub on port " + port);
// });
server.listen(process.env.PORT);
