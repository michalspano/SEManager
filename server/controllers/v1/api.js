/**
 * controllers/v1/api.js
 * 
 * @description :: API middleware for version 1.0.
 * @version     :: 1.0
 */

const express = require('express');
const router = express.Router();
const { CONFIG } = require('./config');

router.get('/', (_, res) => {
    res.json(CONFIG);
});

// Catch other undefined paths (404 - not found)
router.use('/*', (_, res) => {
    res.status(404).json({ "message": "Not Found" });
});

module.exports = router;