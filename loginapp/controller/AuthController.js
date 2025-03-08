const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/UserSchema');

router.use(express.json());

router.get('/users',async(req,res) => {
    let data = await User.find({})
    res.send(data)
})


//register user
router.post('/register',async(req,res) =>{
    try{
          //encrypt password
        let hashpassword = bcrypt.hashSync(req.body.password,8);
        await  User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            phone:req.body.phone,
            role:req.body.role?req.body.role:'User',
        })
        res.status(200).send('Registration Successful')
    }catch(err){
        console.log(err);
        res.status(500).send('Registartion Failed')
    }
})

//login user
router.post('/login',async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(403).send({auth:false,token:"No User found register first"})
        }

        //compare the password
        const passIsValid = await bcrypt.compareSync(req.body.password,user.password)
        if(!passIsValid){
            return res.status(403).send({auth:false,token:"Invalid password"})
        }

        //generate token
        const token = jwt.sign({id:user._id},config.secert,{expiresIn:'10m'})
        return res.status(200).send({auth:true,token})

    }catch(err){
        console.log(err)
        res.status(500).send({auth:false,token:`There was a problem with login`})
    }
})

//userInfo
router.get('/userInfo',async(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token){
        res.status(404).send({auth:false,token:`No Token Found`})
    }
    try{
        const decode = await jwt.verify(token,config.secert);
        console.log(decode)
        const user = await User.findById(decode.id).select('-password')
        if(!user){
            res.status(404).send({auth:false,token:`Inavalid Toke`})
        }
        res.send(user)

    }catch(err){
        res.status(404).send({auth:false,token:`Inavalid Toke`})
    }
})



module.exports = router;
