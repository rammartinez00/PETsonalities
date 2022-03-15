var express = require("express");
var router = express.Router();
const {
  csrfProtection,
  asyncHandler,
  userValidator,
  loginValidators,
} = require("./utils");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { Sequelize } = require("../db/models");
const Op = Sequelize.Op;

/* GET users listing. */
router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await db.User.build();
    res.render("user-signup", {
      title: "Sign Up",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);
router.post(
  "/signup",
  csrfProtection,
  userValidator,
  asyncHandler(async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    const user = await db.User.build({
      fullName,
      userName,
      email,
    });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      //login
      res.redirect(`/users/${user.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-signup", {
        title: "Sign Up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("user-login", {
      title: "Log In",
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // if (loginName.includes("@")) {
    //   var email = loginName;
    // } else {
    //   var userName = loginName;
    // }
    const validatorErrors = validationResult(req);
    let errors = [];
    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      if (user !== null) {
        const passMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passMatch) {
          //login
          return res.redirect("/");
        }
      }
      errors.push("Login failed for the provided email address and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("user-login", {
      title: "Log In",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    res.render("user-profile", {
      title: "Profile",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);
module.exports = router;
