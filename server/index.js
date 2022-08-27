let express = require("express");
let http = require("http");
let path = require("path");
let bodyParser = require("body-parser");
const cors = require("cors");

let app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.get('/u/:userid', async function (req, res) {


 
  const myt = await lookUpById( req.params["userid"]);

  res.send(await getArray(myt));
});

app.post('/u/:userid/add', async function (req, res) {
  let task = req.body;
  task.userid = req.params["userid"];
  await insertTask(task);
  res.send(await getArray(await lookUpById( req.params["userid"])));
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
async function getArray(itemList) {
 

  // await itemList.forEach(curTask => {
  //   if(Number.isNaN(zo)){
  //     zo = curTask.zone;
  //   }
  //   newrow += "<tr>";
  //   newrow += "<th>" + curTask.name + "</th>" + "<th>" + curTask.category + "</th>" + "<th>" + timeformat(curTask.ini,zo) + "</th>";

  //   newrow += "<th>" + timeformat(curTask.ss,zo) + "</th>";

  //   newrow += "<th>" + nowformat(String(curTask.ss - curTask.ini)) + "</th>";
  //   newrow += "</tr>";

  // });
  const mya = await itemList.toArray();
  console.log(mya);
  return mya;


}


async function getTaskTable(itemList) {
  let newrow = "";
  let zo = NaN;

  await itemList.forEach(curTask => {
    if(Number.isNaN(zo)){
      zo = curTask.zone;
    }
    newrow += "<tr>";
    newrow += "<th>" + curTask.name + "</th>" + "<th>" + curTask.category + "</th>" + "<th>" + timeformat(curTask.ini,zo) + "</th>";

    newrow += "<th>" + timeformat(curTask.ss,zo) + "</th>";

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

function timeformat(xxt,zo) {
  let myzo = new Date().getTimezoneOffset();
  var kn = new Date(xxt-(-myzo+zo)*60000);
  return kn.toString().substring(0, 25);

}

http.createServer(app).listen(port);
