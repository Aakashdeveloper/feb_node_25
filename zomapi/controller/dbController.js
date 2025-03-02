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

async function getDataSort(colName,query,sort){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).toArray()
    }catch(err){
        output = {"Error":"Error in getting data"}
    }
    return output
}


async function getDataSortLimit(colName,query,sort,skip,limit){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
    }catch(err){
        output = {"Error":"Error in getting data"}
    }
    return output
}


async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data)
    }catch(err){
        output = {"Error":"Error in post data"}
    }
    return output
}

async function updateData(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data)
    }catch(err){
        output = {"Error":"Error in update data"}
    }
    return output
}

async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition)
    }catch(err){
        output = {"Error":"Error in delete data"}
    }
    return output
}



export {
    dbConnect,
    getData,
    getDataSort,
    getDataSortLimit,
    postData,
    updateData,
    deleteData
}