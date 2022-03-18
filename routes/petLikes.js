const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils")

const db = require("../db/models")

let counter = 0;

router.post("/", asyncHandler(async (req, res) => {
    const userId = res.locals.user.id
    const { petId } = req.body
    console.log(petId)
    const petLike = await db.PetLike.create({ userId, petId })

    counter++


    res.json({ likes: counter })
}))

module.exports = router;