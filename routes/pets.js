const express = require("express");

const db = require("../db/models");
const { asyncHandler, csrfProtection, petValidators } = require("./utils");
const { validationResult } = require("express-validator");
const { requireAuth } = require("../auth");

const router = express.Router();

const checkPermissions = (pet, currentUser) => {
  if (pet.userId !== currentUser.id) {
    const err = new Error("Illegal operation");
    err.status = 403;
    throw err;
  }
};

router.get("/new", requireAuth, csrfProtection, async (req, res) => {
  const pet = db.Pet.build();
  const petType = db.PetType.build();
  const user = res.locals.user;
  const petTypes = await db.PetType.findAll();

  res.render("create-pet", {
    user,
    pet,
    petType,
    petTypes,
    title: 'Create Pet Page',
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/new",
  petValidators,
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { name, description, image, birthday, userId, petTypeId } = req.body;
    const user = res.locals.user;
    const petTypes = await db.PetType.findAll();

    const pet = db.Pet.build({
      name,
      description,
      image,
      birthday,
      userId,
      petTypeId,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      await pet.save();
      res.redirect(`/pets/${pet.id}`);
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      res.render("create-pet", {
        user,
        petTypes,
        pet,
        petTypeId,
        errors,
        title: "Create Pet Page",
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = res.locals.user
    const id = parseInt(req.params.id);
    const pet = await db.Pet.findByPk(id, { include: [db.PetType, db.User] });
    const petLikes = await db.PetLike.findAll({
      where: { petId: id }
    })
    const comments = await db.Comment.findAll({
      where: { petId: id },
      order: [["createdAt", "DESC"]],
    });

    //console.log(petLikes)
    let petLike
    if (user) {
      petLike = petLikes.find(petLike => petLike.userId === user.id)
    }


    res.render("pet-page", {
      user,
      comments,
      pet,
      petLike,
      title: `${pet.name}'s Pet Page`,
      csrfToken: req.csrfToken(),
    });
  })
);

router.get(
  "/:id(\\d+)/edit",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = await db.Pet.findByPk(id, { include: db.PetType });
    const petTypes = await db.PetType.findAll();
    const user = res.locals.user.id;

    checkPermissions(pet, res.locals.user);

    res.render("edit-pet-page", {
      pet,
      petTypes,
      user,
      title: 'Edit Pet Page',
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/:id(\\d+)/edit",
  requireAuth,
  petValidators,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = await db.Pet.findByPk(id);
    const petTypes = await db.PetType.findAll();
    const { name, description, image, birthday, petTypeId } = req.body;
    checkPermissions(pet, res.locals.user);

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      pet.name = name;
      pet.description = description;
      pet.image = image;
      pet.birthday = birthday;
      pet.petTypeId = petTypeId;
      await pet.save();
      return res.redirect(`/pets/${pet.id}`);
    } else {
      const errors = validationErrors.array().map((err) => err.msg);

      res.render("edit-pet-page", {
        pet,
        petTypes,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/:id(\\d+)/delete",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = await db.Pet.findByPk(id);

    checkPermissions(pet, res.locals.user);

    res.render("delete-pet", { pet, csrfToken: req.csrfToken() });
  })
);

router.post(
  "/:id(\\d+)/delete",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = await db.Pet.findByPk(id);
    const petLikes = await db.PetLike.findAll({
      where: { petId: id }
    })
    const comments = await db.Comment.findAll({
      where: { petId: id }
    })

    checkPermissions(pet, res.locals.user);

    petLikes.forEach(async (petLike) => {
      await petLike.destroy()
    })

    comments.forEach(async (comment) => {
      await comment.destroy()
    })

    await pet.destroy();
    res.redirect("/");
  })
);

module.exports = router;
