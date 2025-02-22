import {createClient} from 'redis';
import express from 'express';
import {MongoClient} from 'mongodb';
const app = express();
const port = process.env.PORT || 8709;
const murl = "mongodb://localhost:27017";
const mClient = new MongoClient(murl);

let client = createClient({
    host:'localhost',
    port:6379
})

client.on('error', err=>console.log('Redis Client error',err))

async function main(){
    await mClient.connect()
}

const collection = mClient.db('').collection('')

app.get('/data' async(req,res) => {
    // fill it
})



app.listen(port,() => {
    main()
    console.log(`Running on port ${port}`)
})

