const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')

require('../models/user.models');
const requireLogin = require('../middlewares/requireLogin')

const users = mongoose.model('user')

//& GET
router.get('/getuser', (req, res)=> {
    users.find()
    .then(user=> {
        res.json({userList:user})
    })
    .catch(err=> {
        console.log(err);
    })
})

//& GET TOKEN VALIDATION SIGN IN
router.get('/protected',requireLogin, (req, res)=> {
   res.send("hola desde token validado")
})

//& POST
router.post('/signUp', (req, res)=> {

   const {name, email, password} = req.body;

   if(!name || !email || !password){
     res.json({error: "please insert valide data"})
     console.log("please insert valide data");
   }
   users.findOne({email:email})
   .then((existingUser)=> {
    if(existingUser){
        return res.status(422).json({error: "user email is already exists"})
    }
    bcrypt.hash(password,12,(err, hash) => {
        const newUser = new users({
         name : name ,
         email : email,
         password :  bcrypt.hashSync(password,12)
        })
        newUser.save()
        .then(user => {
            res.json({message: "registered sucesfully"})
            console.log("usuario guardado:", user);
        })
        .catch(err => {
         console.log(err);
        })
    })
   })
});

router.post('/signIn', (req, res)=> {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add an email or password"});
    }
    users.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
                res.json({token})
            }else {
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
 });

//& PUT
router.put('/', (req, res)=> {
    const {id} = req.params 
});

//& DELETE
router.delete('/', (req, res)=> {
    const {id} = req.params 
});

module.exports = router