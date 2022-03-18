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
    // const id = res.locals.user.id
    const id = parseInt(req.params.id);
    const user = res.locals.user;
    const userProfile = await db.User.findByPk(id);
    if (user) {
      const comments = await db.Comment.findAll({
        where: {
          userId: userProfile.id,
        },
        include: db.Pet,
      });
      const userPets = await db.Pet.findAll({
        where: {
          userId: userProfile.id,
        },
      });
      console.log(comments);
      res.render("user-profile", {
        title: "Profile",
        user,
        id,
        userProfile,
        userPets,
        comments,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("log-in");
    }
  })
);

/* GET 'users/id/edit' to get user profile page*/
router.get(
  "/:id(\\d+)/edit",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const userProfile = await db.User.findByPk(id);
    const user = res.locals.user;
    checkPermissions(id, user);

    res.render("user-profile-edit", {
      title: "Edit Profile",
      user,
      userProfile,
      csrfToken: req.csrfToken(),
    });
  })
);

/* POST 'users/id/edit' for editing user profile*/
router.post(
  "/:id(\\d+)/edit",
  requireAuth,
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
    const id = parseInt(req.params.id);
    const userProfile = await db.User.findByPk(id);
    const user = res.locals.user;
    checkPermissions(id, user);

    userProfile.profilePicture = profilePicture;
    userProfile.banner = banner;
    userProfile.websiteLink = websiteLink;
    userProfile.fullName = fullName;
    userProfile.userName = userName;
    userProfile.email = email;
    userProfile.bio = bio;
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await userProfile.save();
      res.redirect(`/users/${userProfile.id}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-profile-edit", {
        title: "Edit Profile",
        user,
        userProfile,
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
