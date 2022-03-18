const express = require("express");
const router = express.Router();
const {asyncHandler} = require ("./utils")

const db = require ("../db/models")



router.get("/", asyncHandler(async(req, res) => {
   // const userId = res.locals.user.id
     const {petId} = req.body
    
    //const petLike = await db.PetLike.build({userId, petId})
    //  const pet = await db.PetLike.findByPk(petId)
   
    // if(petLike){
    
    //     res.json({message: "success", likes: counter})
    // }else {
    //     res.json({message: "failed", likes: counter})
    // }
    
    //res.json({likes: counter})
    res.json({petId})

   // res.render("index", {petLike})

}))

module.exports = router;