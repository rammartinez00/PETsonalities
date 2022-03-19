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
  }
  )

  //console.log('=============like test', pets[0].PetLikes[0].userId)

  let petArr = [];

  if (user) {
    petArr = pets.map(pet => {
      if (pet.PetLikes) {
        for (let i = 0; i < pet.PetLikes.length; i++) {
          if (pet.PetLikes[i].userId === user.id) {
            return {
              true: pet.PetLikes[i].id
            }
          } else {
            return {
              true: 'false'
            }
          }
        }
      } else if (pet.petLike) {
        if (pet.petLike.userId === user.Id) {
          return {
            true: pet.PetLikes.id
          }
        } else {
          return {
            true: 'false'
          }
        }
      } else return {
        true: 'false'
      }
    }
    )
  } else {
    petArr = pets.map(pet => {
      return { true: 'false' }
    })
  }

  console.log('================pet arr', petArr)

  res.render('index', {
    title: 'PETsonalities',
    pets,
    user,
    petArr
  });

}));

module.exports = router;
