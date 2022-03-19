const express = require("express");

const { Sequelize } = require("../db/models");
const db = require("../db/models");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/", async (req, res) => {
  const petTypes = [
    "cat",
    "dog",
    "hamster",
    "fish",
    "turtle",
    "snake",
    "lizard",
    "bird",
    "rabbit",
    "guinea pig",
    "ferret",
    "rat",
    "frog",
    "mice",
    "horse",
  ];
  const search = req.originalUrl.split("=")[1];
  let results;
  if (petTypes.includes(search.toLowerCase())) {
    results = await db.PetType.findAll({
      where: {
        type: {
          [Sequelize.Op.iLike]: search,
        },
      },
      include: {
        model: db.Pet,
        include: db.User,
      },
    });
    if (results.length) {
      const pets = results[0].Pets;
      console.log(results);
      res.render("search", { pets });
    } else {
      res.render("no-results");
    }
  } else {
    results = await db.Pet.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Sequelize.Op.iLike]: search,
            },
          },
          { description: { [Sequelize.Op.iLike]: search } },
        ],
      },
      include: [db.PetType, db.User],
    });
    if (results.length) {
      const pets = results;
      console.log(pets);
      res.render("search", { pets });
    } else {
      res.render("no-results");
    }
  }
});

module.exports = router;
