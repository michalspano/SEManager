/**
 * controllers/v1/courses.js
 * 
 * @description :: CRUD operations for the Course entity.
 * @version     :: 1.0
 */

const express = require('express');
const router = express.Router();
const Course = require('../../models/course');
const Employee = require('../../models/employee');
const { generateLinks } = require('../../utils/utils');
const { verifyTokenAndRole } = require('../../utils/utils');

/* Note: the convention is, when returning the Entity object
 * to wrap it in an Object which carries the name of the entity.
 * Example: given `Course` -> {"course": {}, "links": {}}
 * this is one of the conventions for HATEOAS */

const RESOURCE = "courses";

// Add a new course
router.post('/', verifyTokenAndRole('admin'), (req, res, next) => {
    if (req.body.credits < 0) {
        return res.status(400).json({
            "message": "Invalid number of credits."
        });
    }

    const course = new Course(req.body);
    const courseID = req.body.courseCode;

    const links = generateLinks([
        ["self", [RESOURCE, courseID], "get"],
        ["update", [RESOURCE, courseID], "PUT"],
        ["edit", [RESOURCE, courseID], "PATCH"],
        ["delete", [RESOURCE, courseID], "DELETE"]
    ]);

    course.save()
        .then(() => {
            res.status(201).json({ course, links });
        }).catch((error) => {
            if (error.code === 11000) { // duplicate unique key error is 11_000 by Mongoose
                // HTTP error code 409 denotes a 'conflict'
                res.status(409).json({ message: "Course with this unique key already exists" });
            } else next(error);
        });
});

/* Return the list of all courses, or, if the `x-http-method-override`
 * header is set to 'delete', delete all courses. This is to satisfy the
 * requirement of the assignment, regarding having a certain endpoint
 * use a method override. To satisfy the RESTful API requirements,
 * we use a GET request to delete all courses.*/
router.get('/', (req, res, next) => {
    const HTTPOverride = req.headers['x-http-method-override'];
    if (HTTPOverride && HTTPOverride.toLowerCase() === 'delete') {
        return Course.deleteMany({})
            .then(() => {
                // Note: code 204 indicates that no context is provided
                // and the request is completed.
                res.status(204).send();
            })
            .catch(next);
    }

    const sortBy = req.query.sortBy || 'courseName';
    const order = req.query.order || 'ascending';
    const filterBy = req.query.filterBy || {};
    const limit = req.query.limit || 100;

    let sortOptions = {};
    let filterOptions = {};

    if (Array.isArray(sortBy))
    {
        for (const item of sortBy) {
            sortOptions[item] = order;
        }
    }
    else {
        for (const item of Array(sortBy)) {
            sortOptions[item] = order;
        }
    }

    for (const key in filterBy) {
        filterOptions[key] = filterBy[key];
    }

    Course.find({}).where(filterBy).sort(sortOptions).limit(limit)
        .then((courses) => {
            res.json({ "courses": courses });
        })
        .catch(next);
});

// Return a course given an ID
router.get('/:id', (req, res, next) => {
    // Note: the function `findOne()` is assumed, because
    // the courseCode is a unique identifier of a course.
    const courseID = req.params.id;
    Course.findOne({ courseCode: courseID }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }

            const links = generateLinks([
                ["update", [RESOURCE, courseID], "PUT"],
                ["edit", [RESOURCE, courseID], "PATCH"],
                ["delete", [RESOURCE, courseID], "DELETE"]
            ]);

            res.json({ course, links });
        }).catch(next);
});

// Update a whole course given an ID (PUT)
router.put('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    if (req.body.credits < 0) {
        return res.status(400).json({
            "message": "Invalid number of credits."
        });
    }

    const courseID = req.params.id;
    const updatedCourse = req.body;
    Course.findOneAndUpdate({ courseCode: courseID }, updatedCourse, { new: true }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }

            const links = generateLinks([
                ["self", [RESOURCE, courseID], "GET"],
                ["edit", [RESOURCE, courseID], "PATCH"],
                ["delete", [RESOURCE, courseID], "DELETE"]
            ]);

            res.json({ course, links });
        }).catch(next);
});

// Update a course partially (PATCH)
// Apply HATEOAS to the response
router.patch('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    if (req.body.credits < 0) {
        return res.status(400).json({
            "message": "Invalid number of credits."
        });
    }

    const courseID = req.params.id;
    const updateToApply = req.body; // the undefined values are ignored
    Course.findOneAndUpdate({ courseCode: courseID }, updateToApply, { new: true }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }

            const links = generateLinks([
                ["self", [RESOURCE, courseID], "GET"],
                ["update", [RESOURCE, courseID], "PUT"],
                ["delete", [RESOURCE, courseID], "DELETE"]
            ]);

            // Combine the resource Object with the links in the
            // body of the response.
            res.json({ course, links });
        }).catch(next);
});

// Delete a course given an ID
router.delete('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    Course.findOneAndDelete({ courseCode: req.params.id })
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            res.json({ "course": course });
        }).catch(next);
});

// Post a new employee to a given course
router.post('/:id/employees', verifyTokenAndRole('admin'), (req, res, next) => {
    Course.findOne({ courseCode: req.params.id }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    message: "Course not found."
                });
            }

            const employee = new Employee(req.body);
            try {
                employee.save();
            } catch (error) {
                if (error.code === 11000) { // duplicate unique key error is 11_000 by Mongoose
                    res.status(409).json({ error: "Employee with this unique key already exists" });
                } else next(error);
            }

            // Edit the course and assign the new employee to the course staff
            let newCourseStaff = course.courseStaff;
            newCourseStaff.push(req.body.emailAddress);
            course.courseStaff = newCourseStaff;

            course.save().catch(next);
            res.status(201).json({ "course": course });
        });
});

// Get all employees of a given course
router.get('/:id/employees', (req, res, next) => {
    Course.findOne({ courseCode: req.params.id }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            Employee.find({ emailAddress: { $in: course.courseStaff } }).exec()
                .then((employees) => {
                    if (employees == null) {
                        return res.status(404).json({
                            "message": "Employees not found."
                        });
                    }
                    res.json({ "employees": employees });
                }).catch(next);
        }).catch(next);
});

// Get an employee of a course, given the ID of the employee
router.get('/:id/employees/:employee_id', (req, res, next) => {
    const courseCode = req.params.id;
    const employeeID = req.params.employee_id;
    Course.findOne({ courseCode: courseCode }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
                // Do not proceed to query the Employee if the employeeID is
                // not given in the course.
            } else if (!course.courseStaff.includes(employeeID)) {
                return res.status(404).json({
                    "message": `${employeeID} not found in ${courseCode}`
                });
            }
            Employee.findOne({ emailAddress: employeeID }).exec()
                .then((employee) => {
                    if (employee == null) {
                        return res.status(404).json({
                            "message": "Employee not found."
                        });
                    }
                    res.json({ "employee": employee });
                }).catch(next);
        }).catch(next);
});

// Delete a relationship between a course and an employee
router.delete('/:id/employees/:employee_id', verifyTokenAndRole('admin'), (req, res, next) => {
    const courseCode = req.params.id;
    const employeeID = req.params.employee_id;
    Course.findOne({ courseCode: courseCode }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            const idxToRemove = course.courseStaff.indexOf(employeeID);

            // The relationship does not exist, so no need to delete anything.
            if (idxToRemove == -1) {
                return res.json({
                    "message": "Relationship does not exist, nothing to delete."
                });
            }
            // Remove the employee from the course
            course.courseStaff.splice(idxToRemove, 1);

            course.save().catch(next);
            res.json({ "course": course });
        }).catch(next);
});

module.exports = router;