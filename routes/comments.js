const express = require("express");

const db = require("../db/models");
const { asyncHandler, csrfProtection, commentValidator } = require("./utils");
const { validationResult } = require("express-validator");
const { requireAuth } = require("../auth");

const router = express.Router();

const checkPermissions = (comment, currentUser) => {
  if (comment.userId !== currentUser.id) {
    const err = new Error("Illegal operation");
    err.status = 403;
    throw err;
  }
};

router.post(
  "/",
  requireAuth,
  csrfProtection,
  commentValidator,
  asyncHandler(async (req, res) => {
    const { title, content, userId, petId } = req.body;
    const pet = await db.Pet.findByPk(petId, {
      include: [db.PetType, db.User],
    });
    const user = await db.User.findByPk(userId);
    const comments = await db.Comment.findAll({ where: { petId } });

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

router.patch("/:id(\\d+)", async (req, res) => {
  const id = req.params.id;
  const comment = await db.Comment.findByPk(id);

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
});

router.delete("/:id(\\d+)", async (req, res) => {
  const id = req.params.id;
  const comment = await db.Comment.findByPk(id);
  if (comment) {
    await comment.destroy();
    res.json({ message: "Success" });
  } else {
    res.json({ message: "Failure" });
  }
});

module.exports = router;
