const express = require('express');
const router = express.Router();
//feting user controller route
const usersController = require('../controllers/users_controller');
router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//form is posting the data (sign up)
router.post('/create',usersController.create);

router.post('/create-session',usersController.createSession);
module.exports = router;