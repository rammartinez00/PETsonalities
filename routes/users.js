const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const {
  csrfProtection,
  asyncHandler,
  userValidator,
  loginValidators,
  profileValidators,
} = require("./utils");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");
// const { Sequelize } = require("../db/models");
// const Op = Sequelize.Op;

var router = express.Router();

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
      loginUser(req, res, user);
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
          loginUser(req, res, user);
          return req.session.save(() => {
            res.redirect("/");
          });
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

router.post("/logout", (req, res) => {
  logoutUser(req, res);
  req.session.save(() => {
    res.redirect("/");
  });
});

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    const userPets = await db.Pet.findAll({
      where: {
        userId: user.id,
      },
    });

    res.render("user-profile", {
      title: "Profile",
      user,
      userPets,
      csrfToken: req.csrfToken(),
    });
  })
);

/* GET 'users/id/edit' to get user profile page*/
router.get(
  "/:id(\\d+)/edit",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    res.render("user-profile-edit", {
      title: "Edit Profile",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);
router.use((req, res, next) => {
  console.log(req.session.auth, "hhheeeeerrrreeee");
  next();
});

/* POST 'users/id/edit' for editing user profile*/
router.post(
  "/:id(\\d+)/edit",
  csrfProtection,
  profileValidators,
  asyncHandler(async (req, res) => {
    const {
      fullName,
      userName,
      email,
      profilePicture,
      banner,
      websiteLink,
      bio,
    } = req.body;
    const id = req.params.id;
    const user = await db.User.findByPk(id);
    user.profilePicture = profilePicture;
    user.banner = banner;
    user.websiteLink = websiteLink;
    user.fullName = fullName;
    user.userName = userName;
    user.email = email;
    user.bio = bio;
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await user.save();
      res.redirect(`/users/${user.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-profile-edit", {
        title: "Edit Profile",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
    // res.render("user-profile-edit", {
    //   title: "Edit Profile",
    //   csrfToken: req.csrfToken(),
    // })
  })
);

module.exports = router;
