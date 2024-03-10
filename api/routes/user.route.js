const express = require('express');
const { test } = require('../controllers/user.controller');

const router = express.Router();

// Define your routes here
router.get('/', test);

module.exports = router;