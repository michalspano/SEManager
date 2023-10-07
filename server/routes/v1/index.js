/**
 * routes/v1/index.js
 * 
 * @description :: Router for v1 of the API.
 * @version     :: 1.0
 */

const express = require('express');
const router = express.Router();

// Load the controllers
const apiRouters = require('../../controllers/v1/api');
const coursesRoutes = require('../../controllers/v1/courses');
const employeesRoutes = require('../../controllers/v1/employees');
const usersRoutes = require('../../controllers/v1/users');

// Use the endpoints
router.use('/', apiRouters);
router.use('/courses', coursesRoutes);
router.use('/employees', employeesRoutes);
router.use('/users', usersRoutes);

module.exports = router;