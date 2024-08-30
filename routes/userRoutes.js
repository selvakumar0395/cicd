const express = require('express');
const { getAllUser, getUserById, deleteUserById, updateUserById } = require('../controller/userController');
const router = express.Router();
const {authMiddleware} = require('../middleware/authentication');

router.get('/all-users', authMiddleware, getAllUser);
router.get('/:id', authMiddleware, getUserById);
router.delete('/:id', authMiddleware, deleteUserById);
router.put('/:id', authMiddleware, updateUserById);


module.exports = router;