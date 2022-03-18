const express = require("express");
const router = express.Router();
const {asyncHandler} = require ("./utils")

const db = require ("../db/models")



router.post("/", asyncHandler(async(req, res) => {
    const now = res.locals.user
    const {petId, userId} = req.body
    
    const petLike = await db.PetLike.findByPk(now.id)
    //const newLike = await db. 

    // if((now.id !== petLike)){
    //     const newPetLike = await db.PetLike.create({petId, userId})
    // }
    //const  = await db.PetLike.findByPk(petId)
   
   
    
    // res.json({petLike})

   //res.render("index", {petLike})

}))

module.exports = router;