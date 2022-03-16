const express = require('express');

const db = require('../db/models');
const { asyncHandler, csrfProtection, petValidators } = require('./utils');
const { validationResult } = require('express-validator');

const router = express.Router();

router.get('/new', csrfProtection, async (req, res) => {
    const pet = db.Pet.build();
    const petType = db.PetType.build()
    const user = res.locals.user
    const petTypes = await db.PetType.findAll({ include: db.Pet })

    res.render('create-pet', {
        user,
        pet,
        petType,
        petTypes,
        // title: 'Create Pet Page',
        csrfToken: req.csrfToken()
    })
})

router.post('/new', petValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { name, description, image, birthday, userId, petTypeId } = req.body;
    const user = res.locals.user
    const petTypes = await db.PetType.findAll()
    const petType = await db.PetType.findByPk(petTypeId)

    const pet = db.Pet.build({
        name,
        description,
        image,
        birthday,
        userId,
        petTypeId,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        await pet.save()
        res.redirect(`/pets/${pet.id}`);
    } else {
        const errors = validationErrors.array().map(error => error.msg)
        res.render('create-pet', {
            user,
            petTypes,
            pet,
            petType,
            errors,
            title: 'Create Pet Page',
            csrfToken: req.csrfToken()
        })
    }

}))

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const pet = await db.Pet.findByPk(id, { include: [db.PetType, db.User] })


    res.render('pet-page', { pet })
}))

router.get("/:id/edit", csrfProtection, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id)
    const pet = await db.Pet.findByPk(id, { include: db.PetType })
    const petTypes = await db.PetType.findAll()
    res.render("edit-pet-page", { pet, petTypes })


}))


module.exports = router