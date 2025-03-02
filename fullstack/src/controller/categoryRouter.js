let express = require('express');
let categoryRouter = express.Router();
let {getData} = require('./dbcontroller')


function router(menu){
    categoryRouter.route('/')
        .get(async (req,res) => {
        //res.send("This is the Category route")
        let query = {};
        let data = await getData('category',query)
        res.render('Category',{title:'Category Page',category:data,menu})
    })

    categoryRouter.route('/details')
        .get((req,res) => {
            res.send('Details of category')
    })


    categoryRouter.route('/abc')
        .get((req,res) => {
            res.send('Details of category')
    })

    return categoryRouter
}

module.exports = router

