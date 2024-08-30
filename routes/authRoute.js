const express = require('express');
const { userRegister, userLogin } = require('../controller/authController');
const router = express.Router();


router.post('/login',userLogin);
router.post('/register',userRegister);


module.exports = router;