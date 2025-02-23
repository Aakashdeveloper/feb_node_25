import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
let mongoUrl = process.env.MongoUrl;
let db;

async function dbConnect(){
    const client = new MongoClient(mongoUrl);
    await client.connect()
    db = client.db('restaurants');
    console.log(`Connection successful`)
}

async function getData(colName,query){
    let output;
    try{
        output = await db.collection(colName).find(query).toArray()
    }catch(err){
        output = {"Error":"Error in getting data"}
    }
    return output
}

export {
    dbConnect,
    getData
}