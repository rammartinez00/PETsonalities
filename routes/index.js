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

  //console.log('=============like test', pets[0].PetLikes[0].userId)

  //let petArr = [];
  // console.log(pets[0])
  // console.log('==============petlikes', pets[0].PetLikes)
  // if (user) {
  //   petArr = pets.map(pet => {
  //     if (pet.PetLikes) {
  //       for (let i = 0; i < pet.PetLikes.length; i++) {
  //         if (pet.PetLikes[i].userId === user.id) {
  //           return { exists: pet.PetLikes[i].id }
  //         } else {
  //           return { exists: false }
  //         }
  //       }
  //     } 
  //     else if (pet.PetLike) {
  //       if (pet.PetLike.userId === user.Id) {
  //         return { exists: pet.PetLike.id }
  //       }
  //       else {
  //         return { exists: false }
  //       }
  //     } else return { exists: false }
  //   })
  // } else {
  //   petArr = [{ exists: false }]
  //   // pets.map(pet => {
  //   //   return { exists: false }
  //   // })
  // }

  // console.log(pets[0])
  // console.log('==============petlikes', pets[0].PetLikes)
  // console.log('==============petlikes[0]', pets[0].PetLikes[0].userId)
  // console.log('============userId', user.id)
  // console.log('===========statement', pets[0].PetLikes[0].userId === user.id)

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

  console.log('================pet arr', petArr)

  res.render('index', {
    title: 'PETsonalities',
    pets,
    user,
    petArr
  });

}));

module.exports = router;
