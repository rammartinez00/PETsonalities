const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const { check, validationResult } = require("express-validator");
const db = require("../db/models");

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const userValidator = [
  check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for full name"),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for full name")
    .isLength({ max: 50 })
    .withMessage("Username must not be longer than 50 characters")
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for email address")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for password")
    .isLength({ max: 50 })
    .withMessage("password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for confirm password")
    .isLength({ max: 50 })
    .withMessage("confirm password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
];

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

const petValidators = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for name"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description for your pet"),
  check('image')
    .isURL()
    .withMessage('Please provide a valid image url'),
  check('petTypeId')
    .isInt()
    .withMessage('Please select a pet type')
]


const profileValidators = [
  check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for name"),
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for full name")
    .isLength({ max: 50 })
    .withMessage("Username must not be longer than 50 characters")
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for email address")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
];

module.exports = {
  csrfProtection,
  asyncHandler,
  userValidator,
  loginValidators,
  petValidators,
  profileValidators,
};
