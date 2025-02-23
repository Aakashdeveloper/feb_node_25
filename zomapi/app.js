import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {ObjectId} from 'mongodb'
import {dbConnect,getData} from './controller/dbController';
//imnport bodyParser from 'body-parser'


let app = express();
dotenv.config();
let port = process.env.PORT;
let key = process.env.KEY
// middleware
app.use(cors())
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json())
app.use(express.json())

const VALID_USERNAME = process.env.BASIC_AUTH_USER 
const VALID_PASSWORD = process.env.BASIC_AUTH_PASSWORD 

const basicAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Basic ")){
        return res.status(401).send("Unauthorized")
    }
   // decode base 64 header
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString("utf-8")
    const [username,password] = credentials.split(":");

    if(username === VALID_USERNAME && password === VALID_PASSWORD){
        return next()
    }
    res.status(401).send('Unauthorized')
}

//heartbeat
app.get('/',(req,res) => {
    res.status(200).send('ok')
})

// unautenticated
//get Cities
app.get('/location',async(req,res) => {
    let query = {};
    let collection = 'location';
    let output = await getData(collection,query)
    res.status(200).send(output)
});


// get all restaurants
app.get('/restaurants',async(req,res) => {
    let query = {};
    let stateId = Number(req.query.stateId)
    if(stateId){
        query = {
            "state_id":stateId
        }
    }
    let collection = 'restaurants';
    let output = await getData(collection,query)
    res.status(200).send(output)
});


// get all meals
app.get('/mealtype',async(req,res) => {
    let query = {};
    let collection = 'mealType';
    let output = await getData(collection,query)
    res.status(200).send(output)
});


//restaurants details
app.get('/details/:id',async(req,res)=>{
    try{
        let query = {};
        let restId = req.params.id;
        // query = {
        //     "restaurant_id":Number(restId)
        // }
        // for object id
        const validObjId = (id) => {
            const idPattern = /^[0-9A-Fa-f]{24}$/
            return idPattern.test(id)
        }
        if(validObjId(restId)){
            query = {
                _id: new ObjectId(restId)
            }
        }else{
            res.send("Invalid object id")
        }
    
        let collection = 'restaurants';
        let output = await getData(collection,query)
        res.status(200).send(output)
    }catch(error){
        res.status(500).send("Server error")
    }

})




//get Cities  auth with just key
// autenticated with basic Auth
// app.get('/location',basicAuth,async(req,res) => {
//     let query = {};
//     let collection = 'location';
//     let output = await getData(collection,query)
//     res.status(200).send(output)
 
// })

// //get Cities  auth with just key
// app.get('/location',async(req,res) => {
//     let query = {};
//     let collection = 'location';
//     let authKey = req.headers['x-auth-token']
//     if(authKey == key){
//         let output = await getData(collection,query)
//         res.status(200).send(output)
//     }else{
//         res.status(401).send('Unauthorized')
//     }
 
// })

app.listen(port,() => {
    dbConnect()
    console.log(`Running on port ${port}`)
})