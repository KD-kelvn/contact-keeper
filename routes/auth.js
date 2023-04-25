const express = require('express');
const router = express.Router();

// @route   GET /api/auth
// @desc    get a logged in user
// @access   private
router.get('/', ((req, res)=>res.send("Get a logged in user")));
module.exports = router;

// @route   POST /api/auth
// @desc    authenticate a logged in user and get a token
// @access   public
router.post('/', ((req, res)=>res.send("Auth a logged in user")));
module.exports = router;