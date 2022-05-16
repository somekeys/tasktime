let express = require("express");
let http = require("http");
let path = require("path");
const { nanoid } = require('nanoid');
var cookieParser = require('cookie-parser');
let bodyParser = require("body-parser");

let app = express();
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.get('/', async function (req, res) {
  if (!req.cookies.myid) {
    res.cookie("myid", nanoid());
  } else {
    console.log("user:" + req.cookies.myid);
  }
  let myt = await getTaskTable(await lookUpById(req.cookies.myid));

  res.render('index', { taskTable: myt });
});

app.post('/', async function (req, res) {
  let task = req.body;
  task.userid = req.cookies.myid;
  await insertTask(task);
  let myt = await getTaskTable(await lookUpById(req.cookies.myid));
  res.send(myt);
});


require("dotenv").config({ path: path.resolve(__dirname, '.env') })
const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${userName}:${password}@cluster0.hfwp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const databaseAndCollection = { db: process.env.MONGO_DB_NAME, collection: process.env.MONGO_COLLECTION };
async function insertTask(task) {

  try {
    await client.connect();

    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(task);


  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function lookUpById(id) {

  await client.connect();


  let filter = { userid: id };
  const sort = { ini: -1 };
  const result = await client.db(databaseAndCollection.db)
    .collection(databaseAndCollection.collection)
    .find(filter).sort(sort);

  return result
}

async function getTaskTable(itemList) {
  let newrow = "";

  await itemList.forEach(curTask => {
    newrow += "<tr>";
    newrow += "<th>" + curTask.name + "</th>" + "<th>" + curTask.category + "</th>" + "<th>" + timeformat(curTask.ini) + "</th>";

    newrow += "<th>" + timeformat(curTask.ss) + "</th>";

    newrow += "<th>" + nowformat(String(curTask.ss - curTask.ini)) + "</th>";
    newrow += "</tr>";

  });
  return newrow;


}

function nowformat(mills) {
  var text = "";
  text += Math.floor(mills / (1000 * 60 * 60)) + "h";
  text += Math.floor(mills % (1000 * 60 * 60) / (1000 * 60)) + "m";
  text += Math.floor(mills % (1000 * 60 * 60) % (1000 * 60) / (1000)) + "s";
  return text;


}

function timeformat(xxt) {
  var kn = new Date(xxt);
  return kn.toString().substring(0, 25);

}

http.createServer(app).listen(port);
