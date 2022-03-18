const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils")

const db = require("../db/models")

router.post("/", asyncHandler(async (req, res) => {
    const currentUser = res.locals.user
    const { petId } = req.body
    const petLikes = await db.PetLike.findAll({
        where: { petId }
    })
    const userPetLike = await db.PetLike.findOne({
        where: {
            userId: currentUser.id,
            petId
        }
    });
    console.log(petLikes)
    console.log(petLikes.length)
    if (userPetLike) {
        res.json({ liked: false })
    } else {
        const petLike = await db.PetLike.create({ userId: currentUser.id, petId })
        res.json({
            confirmed: true,
            sentPetLike: petLike,
            likes: petLikes.length
        })
    }

}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const petLike = await db.PetLike.findByPk(id);

    if (petLike) {
        await petLike.destroy();
        res.json({ message: 'success' })
    } else {
        res.json({ message: 'fail' })
    }
}))

module.exports = router;