const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likes_controller');
console.log("entered in like.js route")

router.get('/toggle', likeController.toggleLike);


module.exports = router;