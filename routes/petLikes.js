const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils")

const db = require("../db/models")

router.post("/", asyncHandler(async (req, res) => {
    const user = res.locals.user
    const { petId } = req.body
    const petLikes = await db.PetLike.findAll()
    const userPetLike = await db.PetLike.findOne({
        where: {
            userId: user.id,
            petId
        }
    });

    if (userPetLike) {
        res.json({
            liked: true,
            likes: petLikes.length
        })
    } else {
        const petLike = await db.PetLike.create({ userId: user.id, petId })
        res.json({ likes: petLikes.length })
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