const express = require('express');
const router = express.Router();
//fetching home_controller route
const homeController = require('../controllers/home_controller');
//to check in terminal router is loades or not 
//console.log("router loaded");
//root of all the routes comes here 
router.get('/',homeController.home);
//fetching the users.js router and make them include in root of routes index.js
router.use('/users',require('./users'));
//fetching the posts.js router
router.use('/posts',require('./posts'));
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;