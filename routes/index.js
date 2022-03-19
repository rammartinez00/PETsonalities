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

  if (user) {
    petArr = pets.map(pet => {
      if (pet.PetLikes.length) {
        for (let i = 0; i < pet.PetLikes.length; i++) {
          if (pet.PetLikes[i].userId === user.id) {
            return { exists: pet.PetLikes[i].id }
          } else return { exists: false }
        }
      } else {
        return { exists: false }
      }
    })
  } else {
    petArr = [{ exists: false }]
  }


  res.render('index', {
    title: 'PETsonalities',
    pets,
    user,
    petArr
  });

}));

module.exports = router;
