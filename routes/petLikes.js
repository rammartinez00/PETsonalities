const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils")
const { requireAuth } = require('../auth')

const db = require("../db/models")

router.post("/", requireAuth, asyncHandler(async (req, res) => {
    const currentUser = res.locals.user
    const { petId } = req.body
    const userPetLike = await db.PetLike.findOne({
        where: {
            userId: currentUser.id,
            petId
        }
    });

    if (userPetLike) {
        res.json({ liked: false })
    } else {
        const petLike = await db.PetLike.create({ userId: currentUser.id, petId })
        const petLikes = await db.PetLike.findAll({
            where: { petId }
        })
        res.json({
            liked: true,
            sentPetLike: petLike,
            likes: petLikes.length
        })
    }

}))

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const petLike = await db.PetLike.findByPk(id);
    if (petLike) {
        await petLike.destroy();
        const petLikes = await db.PetLike.findAll({
            where: { petId: petLike.petId }
        })
        res.json({
            message: 'success',
            likes: petLikes.length
        })
    } else {
        res.json({ message: 'fail' })
    }
}))

module.exports = router;