var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../routes/utils');
const db = require('../db/models');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const pets = await db.Pet.findAll({
    order: [['createdAt', 'DESC']],
    limit: 10
  })


  res.render('index', {
    title: 'PETsonalities',
    pets
  });

}));

module.exports = router;
