const express = require("express");
const router = express.Router();
const {asyncHandler} = require ("./utils")

const db = require ("../db/models")

let counter = 0;

router.post("/", asyncHandler(async(req, res) => {
    const userId = res.locals.user.id
     const {petId} = req.body
    //const petLike = await db.PetLike.create({userId, petId})
   
    // if(petLike){
         counter++
    //     res.json({message: "success", likes: counter})
    // }else {
    //     res.json({message: "failed", likes: counter})
    // }
    
    //res.json({likes: counter})
    res.json({petId, userId})

}))

module.exports = router;