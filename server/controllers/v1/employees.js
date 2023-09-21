/**
 * controllers/v1/employees.js
 * 
 * @description :: CRUD operations for the Staff entity.
 * @version     :: 1.0
 */

const express = require('express');
const router = express.Router();
const Employee = require('../../models/employee');
const Course = require('../../models/course');
const { formatHref } = require('./config');

const RESOURCE = "employees";

// Add a new employee
router.post('/', (req, res, next) => {
    const employee = new Employee(req.body);
    employee.save().catch(next);

    const emailAddress = req.body.emailAddress;

    const links = [
        {
            rel: 'self',
            href: formatHref(emailAddress, RESOURCE),
            method: 'GET',
        },
        {
            rel: 'update',
            href: formatHref(emailAddress, RESOURCE),
            method: 'PUT'
        },
        {
            rel: 'edit',
            href: formatHref(emailAddress, RESOURCE),
            method: 'PATCH'
        },
        {
            rel: 'delete',
            href: formatHref(emailAddress, RESOURCE),
            method: 'DELETE'
        }
    ];

    res.status(201).json({ employee, links });
});

// Return the list of all employees
router.get('/', (req, res, next) => {

    const sortBy = req.query.sortBy || 'name';
    const limit = req.query.limit || 10;
    const order = req.query.order || 'ascending';

    let querySelector = {};
    querySelector[sortBy] = order;

    Employee.find({}).sort(querySelector).limit(limit)
        .then((employees) => {
            res.json({ "employees": employees });
        })
        .catch(next);
});

// Delete all employees
router.delete('/', (_, res, next) => {
    Employee.deleteMany({}).then(() => {
        res.status(204).send();
    })
        .catch(next);
});

// Return an employee given an ID
router.get('/:id', (req, res, next) => {
    Employee.findOne({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    "message": "Employee not found."
                });
            }
            res.json({ "employee": employee });
        }).catch(next);
});

// Delete an employee given an ID
router.delete('/:id', (req, res, next) => {
    Employee.findOneAndDelete({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    "message": "Employee not found."
                });
            }
            res.json({ "employee": employee });
        }).catch(next);
});

// Update a whole employee given an ID
router.put('/:id', (req, res, next) => {
    Employee.findOne({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    "message": "Employee not found."
                });
            }

            employee.emailAddress = req.body.emailAddress;
            employee.name = req.body.name;
            employee.contactInfo = req.body.contactInfo;

            employee.save().catch(next);
            res.json({ "employee": employee });
        }).catch(next);
});

// Update partially an employee
router.patch('/:id', (req, res, next) => {
    Employee.findOne({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    "message": "Employee not found."
                });
            }

            employee.emailAddress = req.body.emailAddress || employee.emailAddress;
            employee.name = req.body.name || employee.name;
            employee.contactInfo = req.body.contactInfo || employee.contactInfo;

            // Save and populate the response
            employee.save().catch(next);

            res.json({ "employee": employee });
        }).catch(next);
});

// TODO: check for exceptions
// Get all the courses of a given employee
router.get('/:id/courses', (req, res, next) => {
    Employee.findOne({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    message: 'Employee not found.'
                });
            }
            // Try to find the courses here
            // Get all the courses whose courseStaff matches employee I think
            // TODO: See why this works
            Course.find({ courseStaff: employee.emailAddress }).exec()
                .then((courses) => {
                    if (courses == null) {
                        return res.status(404).json({
                            message: "Courses not found."
                        });
                    }
                    res.json(courses);
                }).catch(next);

        });
});

// TODO: check for exceptions
// Get a given course of a given employee
// TODO: review this as it is pretty much useless
router.get('/:id/courses/:course_id', (req, res, next) => {
    const course_id = req.params.course_id;
    Employee.findOne({ emailAddress: req.params.id }).exec()
        .then((employee) => {
            if (employee == null) {
                return res.status(404).json({
                    message: 'Employee not found.'
                });
            }
            Course.findOne({ courseCode: course_id, courseStaff: employee.emailAddress }).exec()
                .then((course) => {
                    if (course == null) {
                        return res.status(404).json({
                            message: "No courses found."
                        });
                    }
                    // Find the second :id that matches the course
                    res.json(course);
                }).catch(next);
        });
});

// Catch other undefined paths (404 - not found)
router.use('/:id/*', (_, res) => {
    res.status(404).json({ "message": "Not Found" });
});

module.exports = router;
