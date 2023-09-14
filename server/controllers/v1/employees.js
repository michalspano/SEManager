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
    res.status(201).json({"employee": employee});
});

// Return the list of all employees
router.get('/', (_, res, next) => {
    Employee.find({}).then((employees) => {
        res.json({"employees": employees});
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
        res.json({"employee": employee});
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
        res.json({"employee": employee});
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
        employee.name = req.body.name;
        employee.contactInfo = req.body.contactInfo;

        employee.save().catch(next);
        res.json({"employee": employee});
    }).catch(next);
});

// Update partially an employee
router.patch('/:id', (req, res, next) => {
    Employee.findOne({emailAddress: req.params.id}).exec()
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

        res.json({"employee": employee});
    }).catch(next);
});

// Catch other undefined paths (404 - not found)
router.use('/:id/*', (_, res) => {
    res.status(404).json({ "message": "Not Found" });
});

module.exports = router;
