const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log("router loaded");//to check in terminal router is loades or not 

router.get('/',homeController.home);
module.exports = router;