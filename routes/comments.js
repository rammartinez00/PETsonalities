const express = require('express');

const db = require('../db/models');
const { asyncHandler, csrfProtection, commentValidator } = require('./utils');
const { validationResult } = require('express-validator');
const { requireAuth } = require('../auth');

const router = express.Router();

const checkPermissions = (pet, currentUser) => {
    if (pet.userId !== currentUser.id) {
        const err = new Error('Illegal operation');
        err.status = 403;
        throw err;
    }
}

router.post('/', requireAuth, csrfProtection, commentValidator, asyncHandler(async (req, res) => {
    const { title, content, userId, petId } = req.body;
    const pet = await db.Pet.findByPk(petId, { include: [db.PetType, db.User] })
    const user = await db.User.findByPk(userId)


    const comment = db.Comment.build({
        title,
        content,
        petId,
        userId
    })

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
        await comment.save()
        res.redirect(`/pets/${petId}`);
    } else {
        const errors = validationErrors.array().map(error => error.msg)
        res.render('pet-page', {
            user,
            pet,
            errors,
            csrfToken: req.csrfToken()

        })
    }
}))






module.exports = router
