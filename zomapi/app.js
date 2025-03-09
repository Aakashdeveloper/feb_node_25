import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {ObjectId} from 'mongodb'
import {dbConnect,getData,getDataSort,getDataSortLimit,postData,
    updateData,deleteData} from './controller/dbController';
//imnport bodyParser from 'body-parser'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import SwaggerDocument from './swagger.json'


let app = express();
dotenv.config();
let port = process.env.PORT;
let key = process.env.KEY

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(SwaggerDocument))
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
app.get('/health',(req,res) => {
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
app.get('/mealtype',basicAuth,async(req,res) => {
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




//filters
app.get('/filters/:mealId',async(req,res)=>{
    let query = {};
    let collection = "restaurants";
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisineId)
    let hcost = Number(req.query.hcost);
    let lcost = Number(req.query.lcost);
    let sort = {cost:1}
    let skip = 0;
    let limit = 10000000000000000;

    if(req.query.sortKey && req.query.sortOrder){
        let order = Number(req.query.sortOrder)?Number(req.query.sortOrder):1
        sort =  {[req.query.sortKey]:order}
        console.log(sort)
    }

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip );
        limit = Number(req.query.limit );
    }

   
    if(cuisineId && hcost && lcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }

    }else if(hcost && lcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else{
        query = {
            "mealTypes.mealtype_id":mealId
        }
    }
    
    let output = await getDataSortLimit(collection,query,sort,skip,limit)
    res.status(200).send(output)
})


//menu wrt to rest
app.get('/menu/:id',async(req,res) => {
    let collection = 'menu';
    let query = {restaurant_id:Number(req.params.id)};
    let output = await getData(collection,query)
    res.status(200).send(output)
});


//menuDetails {"id":[1,2,3]}
app.post('/menuDetails',async(req,res)=>{
    if(Array.isArray(req.body.id)){
      let query = {menu_id:{$in:req.body.id}}
      let collection = 'menu';
      let output = await getData(collection,query)
      res.status(200).send(output)
    }else{
        res.send(`Please Pass data in format of {"id":[1,2,3]}`)
    }
})


//place order
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    console.log(data)
    let collection = "orders";
    let output = await postData(collection,data);
    res.status(200).send(output)

})

//get all orders
app.get('/orders',async(req,res) => {
    let collection = 'orders';
    let query = {};
    if(req.query.email){
        query = {email:req.query.email};
    }
    let output = await getData(collection,query)
    res.status(200).send(output)
});

//update Order
app.put('/updateOrder',async(req,res) => {
    let collection = "orders";
    let condition = {_id:new ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }

    let output = await updateData(collection,condition,data);
    res.status(200).send(output)
})


app.delete('/deleteOrder',async(req,res) => {
    let collection ="orders"
    let condition = {_id:new ObjectId(req.body._id)}
    let row = await getData(collection,condition)
    if(row.length>0){
        await deleteData(collection,condition);
        res.status(200).send("Data Deleted")
    }else{
        res.status(200).send("No Record found")
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