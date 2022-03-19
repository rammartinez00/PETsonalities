const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../db/models");
const { requireAuth } = require('../auth');
const { asyncHandler, csrfProtection, commentValidator } = require("./utils");

const router = express.Router();

const checkPermissions = (comment, currentUser) => {
  if (comment.userId !== currentUser.id) {
    const err = new Error('Illegal Operation')
    err.status = 403;
    throw err;
  }
}

router.post(
  "/",
  csrfProtection,
  requireAuth,
  commentValidator,
  asyncHandler(async (req, res) => {
    const { title, content, userId, petId } = req.body;
    const pet = await db.Pet.findByPk(petId, {
      include: [db.PetType, db.User],
    });
    const user = await db.User.findByPk(userId);
    const comments = await db.Comment.findAll({
      where: { petId },
      order: [["createdAt", "DESC"]],
    });

    const comment = db.Comment.build({
      title,
      content,
      petId,
      userId,
    });

    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      await comment.save();
      res.redirect(`/pets/${petId}`);
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      res.render("pet-page", {
        user,
        comments,
        pet,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.patch("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const currentUser = res.locals.user
  const comment = await db.Comment.findByPk(id);

  checkPermissions(comment, currentUser)

  if (!(req.body.content.length > 1)) {
    res.json({ message: "Failure" });
  }

  if (comment) {
    comment.content = req.body.content;
    await comment.save();
    res.json({ message: "Success", comment });
  } else {
    res.json({ message: "Could not find comment" });
  }
}));

router.delete("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const currentUser = res.locals.user
  const comment = await db.Comment.findByPk(id);

  checkPermissions(comment, currentUser)

  if (comment) {
    await comment.destroy();
    res.json({ message: "Success" });
  } else {
    res.json({ message: "Failure" });
  }
}));

module.exports = router;
