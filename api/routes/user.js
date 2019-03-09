const User = require('../objects/user');
const router = require('express').Router();

router.get('/all', User.getAllUser)
router.get('/byEmail', User.getUserByEmail);
router.get('/auth', User.authUser);

module.exports = router;