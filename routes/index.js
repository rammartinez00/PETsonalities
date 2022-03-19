var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../routes/utils');
const db = require('../db/models');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const user = res.locals.user
  const pets = await db.Pet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 10,
    include: [db.PetLike]
  })

  // console.log(pets[0].PetLikes.length)

  res.render('index', {
    title: 'PETsonalities',
    pets,
    user,
  });

}));

module.exports = router;
