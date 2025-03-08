const express = require('express');
const app = express()
const port = 8700;

app.use(express.json())

const Pool = require('pg').Pool;
const pool = new Pool({
    user:'',
    host:'127.0.0.1',
    port:5432,
    database:'postgres'
})

app.get('/',(req,res) => {
    pool.query('SELECT * FROM employee',(err,result) =>{
        if(err) throw err;
        res.send(result.rows)
    })
})


app.post('/add',(req,res) => {
    let id = req.body.id;
    let fname =  req.body.fname;
    let lname =  req.body.lname;
    let role =  req.body.role;
    pool.query('insert into employee(id,fname,lname,role) values ($1,$2,$3,$4)',
    ([id,fname,lname,role]),(err,result) => {
        if(err) throw err;
        res.send(result.rows)
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})