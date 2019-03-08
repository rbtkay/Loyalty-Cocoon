const User = require('../objects/user');
const router = require('express').Router();

router.get('/All', User.getUser); 
router.get('/ByEmail', User.getUserByEmail);
router.get('/auth', User.authUser);

module.exports = router;