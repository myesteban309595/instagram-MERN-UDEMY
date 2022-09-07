const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Post = mongoose.model('Post')

//& visualizar todos los post
router.get('/allpost', (req,res)=> {
    Post.find()
    .populate("postedBy", "_id name") // al aplicar populate, me muestra todo el objeto del objetId y puedo limintar sus datos a mostrar
    .then(post=> {
        res.json({posts:post})
    })
    .catch(err=> {
        console.log(err);
    })
})

//& crear un post
router.post('/createpost',requireLogin, (req,res)=> {
    const {title, body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"please add all the fields"})
    }
    //console.log("req.user:", req.user); // manda la info del usuario por el middleware y el token
    
    req.user.password = undefined  //& de esta forma evito pasar la contraseña en el result del post
    
    const post = new Post({
        title: title,
        body: body,
        postedBy: req.user
    })
    post.save()
    .then( result => {
        res.json({post:result})
    })
    .catch(err=> {
        console.log(err);
    })
})

//& visualizar los post hechos por mi
router.get('/mypost',requireLogin, (req,res)=> {
    console.log("req.user:", req.user);

    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id name") // al aplicar populate, me muestra todo el objeto del objetId y puedo limintar sus datos a mostrar
    .then(mypost=> {
        res.json({mypost})
    })
    .catch(err=> {
        console.log(err);
    })
})

module.exports = router