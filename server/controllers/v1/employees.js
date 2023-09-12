/**
 * controllers/v1/courses.js
 * 
 * @description :: CRUD operations for the Staff entity.
 * @version     :: 1.0
 */

const express = require('express');
const router = express.Router();
const Employee = require('../../models/employee');

// Add CRUD relationships here

// Add a new employee
router.post('/', (req, res, next) => {
    const employee = new Employee(req.body);
    employee.save().catch(next);
    res.status(201).json(employee);
});

// Return the list of all employees
router.get('/', (_, res, next) => {
    Employee.find({}).then((employees) => {
        res.json(employees);
    })
    .catch(next);
})

// Delete all employees
router.delete('/', (_, res, next) => {
    Employee.deleteMany({}).then(() => {
        res.status(204).send();
    })
    .catch(next);
})

// Return an employee given an ID
router.get('/:id', (req, res, next) => {
    Employee.findOne({emailAddress: req.params.id}).exec()
    .then((employee) => {
        if (employee == null) {
            return res.status(404).json({
                "message": "Employee not found."
            });
        }
        res.json(employee);
    }).catch(next);
});

// Delete an employee given an ID
router.delete('/:id', (req, res, next) => {
    Employee.findOneAndDelete({emailAddress: req.params.id}).exec()
    .then((employee) => {
        if (employee == null) {
            return res.status(404).json({
                "message": "Employee not found."
            });
        }
        res.json(employee);
    }).catch(next);
})

// Update a whole employee given an ID
router.put('/:id', (req, res, next) => {
    Employee.findOne({emailAddress: req.params.id}).exec()
    .then((employee) => {
        if (employee == null) {
            return res.status(404).json({
                "message": "Employee not found."
            })
        }

        employee.emailAddress = req.body.emailAddress;
        employee.contactInfo = req.body.contactInfo;

        employee.save().catch(next);
        res.json(employee);
    }).catch(next);
});

// Update partially an employee
// TODO: This is not working
router.patch('/:id', (req, res, next) => {
    Employee.findOne({emailAddress: req.params.id}).exec()
    .then((employee) => {
        if (course == null) {
            return res.status(404).json({
                "message": "Employee not found."
            });
        }

        // Update provided fields
        for(key in req.body) {
            employee[key] = req.body.key;
        }

        // Save and populate the response
        employee.save().catch(next);

        res.json(employee);
    }).catch(next);
});

module.exports = router;
