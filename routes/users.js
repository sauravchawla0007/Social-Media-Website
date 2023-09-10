const express = require('express');
const router = express.Router();
//feting user controller route
const usersController = require('../controllers/users_controller');
router.get('/profile',usersController.profile);

module.exports = router;