const express = require("express");
const router = express.Router();

const User = require('../objects/user');

router.get('/userAll', User.getUser); 
router.get('/getUserByEmail', User.getUserByEmail);
router.get('/auth', User.authUser);

module.exports = router;