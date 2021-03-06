var express = require("express");
var router = express.Router();
const { asyncHandler } = require("../routes/utils");
const db = require("../db/models");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const user = res.locals.user;
    const pets = await db.Pet.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
      include: [db.PetLike],
    });

    // if (user) {
    //   petArr = pets.map(pet => {
    //     if (pet.PetLikes.length) {
    //       for (let i = 0; i < pet.PetLikes.length; i++) {
    //         if (pet.PetLikes[i].userId === user.id) {
    //           return { exists: pet.PetLikes[i].id }
    //         } else {
    //           console.log('=========HERRRRRRRRRRRRRREE')
    //           return { exists: false }
    //         }

    //       }
    //     } else {
    //       console.log('========ELSEEEEEEEEEEE')
    //       return { exists: false }
    //     }
    //   })
    // } else {
    //   petArr = [{ exists: false }]
    // }


    if (user) {
      petArr = pets.map(pet => {
        if (pet.PetLikes.length) {
          //console.log('=====================pet', pet)
          //console.log('====================petLikes', pet.PetLikes)
          //console.log('petId', pet.id)
          //console.log('petLikesLength', pet.PetLikes.length)
          const petLike = pet.PetLikes.find(petLike => {
            // console.log('petLikdId', petLike.id)
            // console.log('petLikeUserId', petLike.userId)
            // console.log('userId', user.id)
            //console.log('------------------------------------------------')
            return petLike.userId === user.id
          })
          // console.log('found pet like', petLike)
          // console.log('----------------')
          if (petLike) {
            //console.log('HERRRRRRRRRRRRRRRRRRE')
            return { exists: petLike.id }
          } else {
            //console.log('THEREEEEEEEEEEEEEEEEEEEEEEEEEE')
            return { exists: false }
          }
        } else {
          return { exists: false }
        }
      })
    } else {
      petArr = [{ exists: false }]
    }

    // console.log('=============petArr', petArr)


    res.render("index", {
      title: "PETsonalities",
      pets,
      user,
      petArr,
    });
  })
);

module.exports = router;
