const express = require('express');
const { check, body } = require('express-validator');

const AuthController = require('../controllers/auth-controller');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.get('/login', AuthController.getLogin);

authRouter.get('/signup', AuthController.getSignup);

authRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
    body('password', 'Password has to be valid.').isLength({ min: 5 }).isAlphanumeric().trim(),
  ],
  AuthController.postLogin,
);

authRouter.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-Mail exists already, please pick a different one.');
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.',
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      }),
  ],
  AuthController.postSignup,
);

authRouter.post('/logout', AuthController.postLogout);

authRouter.get('/reset', AuthController.getReset);

authRouter.post('/reset', AuthController.postReset);

authRouter.get('/reset/:token', AuthController.getNewPassword);

authRouter.post('/new-password', AuthController.postNewPassword);

module.exports = authRouter;
