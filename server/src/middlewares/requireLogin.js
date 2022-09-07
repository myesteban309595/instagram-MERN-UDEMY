const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose');
const user = mongoose.model('user')

module.exports = (req,res,next)=> {
    const {authorization} = req.headers;
    console.log("authorization:",authorization);
    // authorization  === Bearer 4rtsdlkfjlkdf
    if(!authorization){
       console.log("not authorized");
       return res.status(401).json({error:"you must be logged in"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
           return res.status(401).json({error:"you must be logged in"});
        }
        const {_id} = payload;
        user.findById(_id).then(userdata=> {
            req.user = userdata;
            next();
        })
    })
}