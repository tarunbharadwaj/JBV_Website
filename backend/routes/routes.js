const express = require('express');
const router = express.Router();

const {
    getUserByEmail
} = require('../controllers/authController');

router.get('/user/:email', getUserByEmail);

module.exports = router;