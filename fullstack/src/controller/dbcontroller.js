let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb://127.0.0.1:27017";
let db;

async function dbConnect(){
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db('febnode')
    console.log('Connection Successfull')
}

async function getData(colName,query){
    return await db.collection(colName).find(query).toArray()
}


module.exports = {
    dbConnect,
    getData
}