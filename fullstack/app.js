let express = require('express');
let app = express();
let port = 9801;
let {dbConnect} = require('./src/controller/dbcontroller');

let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

let categoryRouter = require('./src/controller/categoryRouter')(menu);
let productRouter = require('./src/controller/productRouter')(menu);

//static file path
app.use(express.static(__dirname+'/public'))
//ejs file path
app.set('views','./src/views')
// view engine
app.set('view engine','ejs')

//default route
app.get('/',(req,res) => {
    //res.send("Hii From Express")
    res.render('index',{title:'Home Page'})
});


app.use('/category',categoryRouter)
app.use('/products',productRouter)

app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
   // console.log("Server is running on port "+port)
    console.log(`Server is running on port ${port}`)
});


