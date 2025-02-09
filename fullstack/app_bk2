let express = require('express');
let app = express();
let port = 9801;
let categoryRouter = express.Router();
let productRouter = express.Router()

//default route
app.get('/',(req,res) => {
    res.send("Hii From Express")
});

categoryRouter.route('/')
    .get((req,res) => {
        res.send("This is the Category route")
})

categoryRouter.route('/details')
    .get((req,res) => {
        res.send('Details of category')
})


categoryRouter.route('/abc')
    .get((req,res) => {
        res.send('Details of category')
})

productRouter.route('/')
    .get((req,res) => {
        res.send("This is the Product route")
})

productRouter.route('/details')
    .get((req,res) => {
        res.send('Details of Products')
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

app.listen(port,(err) => {
    if(err) throw err;
   // console.log("Server is running on port "+port)
    console.log(`Server is running on port ${port}`)
});