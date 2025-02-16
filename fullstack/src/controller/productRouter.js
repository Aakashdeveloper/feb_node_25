let express = require('express');
let productRouter = express.Router()
let {getData} = require('./dbcontroller')

function router(menu){

    productRouter.route('/')
        .get(async(req,res) => {
        //res.send("This is the Product route")
        let query = {};
        let products = await getData('products',query)
        res.render('products',{title:'Products Page',products,menu})
    })
    
    productRouter.route('/list/:id')
        .get(async (req,res) => {
            let {id} = req.params
            let query = {"category_id":Number(id)}
            let products = await getData('products',query)
            res.render('products',{title:'Products Page',products,menu})
    })

    return productRouter
}

module.exports = router

         // let id = req.params.id
            // let name = req.params.name
            //let {id,name} = req.params
            // console.log(id)
            // console.log(name)