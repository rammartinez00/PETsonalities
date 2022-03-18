const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { requireAuth } = require("../auth");

const checkPermissions = (userId, currentUser) => {
  if (userId !== currentUser.id) {
    const err = new Error("Illegal operation");
    err.status = 403;
    throw err;
  }
};

const {
  csrfProtection,
  asyncHandler,
  userValidator,
  loginValidators,
  profileValidators,
} = require("./utils");
const { Sequelize } = require("../db/models");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");
const Op = Sequelize.Op;

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.originalUrl.split("=")[1];
  //   const results = await db.Pet.findAll({
  //     where: {
  //       [Op.or]: [{ name: search }, { description: search }],
  //     },
  //     include: [db.PetType, db.User],
  //   });
  const results = await db.PetType.findAll({
    where: { type: search },
    include: {
      model: db.Pet,
      include: db.User,
    },
  });
  if (results.length) {
    const pets = results[0].Pets;
    console.log(pets);
    res.render("search", { pets });
  } else {
    res.render("no-results");
  }
});

module.exports = router;
