let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const server = require("http").createServer(app);
const MongoClient = require("mongodb").MongoClient;
let apiRoutes = require("./api-routes");
var database;
// Configure bodyparser to handle post requests
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  return { status: "Bem vindos a api de logs" };
});
// Connect to Mongoose and set connection variable
MongoClient.connect(
  "mongodb://conectedudemonstracao:0aHMcTOvR2Xu1kQpNoI9QHm7LB4qc7vsgQTRfsEBc9u4nT0fPnuq8v9UvSvDDUmwwifKi0Nt08rkBKOGNfaPkg==@conectedudemonstracao.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@conectedudemonstracao@&retrywrites=false",
  function (err, client) {
    console.log("Connected successfully to server");
    const db = client.db("logsNiteroi");
    database = db;
  }
);

var port = process.env.PORT || 8080;

// Send message for default URL

app.post("/postlog", (req, res) => {
  database
    .collection("logs")
    .insertOne(req.body)
    .then(() => {})
    .catch((err) => console.log(err));
  res.status(200).json({ status: "Cadastrado" });
});
app.listen(3000, function () {
  console.log("Running RestHub on port " + port);
});
