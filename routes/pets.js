const express = require('express');

const db = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

router.get('/new', csrfProtection, (req, res) => {
    const pet = db.Pet.build();
    const user = res.locals.user

    res.render('create-pet', { user, pet, csrfToken: req.csrfToken() })
})


router.get('/:id', asyncHandler(async (req, res) => {


    res.render('pets')
}))


module.exports = router