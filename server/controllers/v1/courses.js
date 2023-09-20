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

// Note: the convention is, when returning the Entity object
// to wrap it in an Object which carries the name of the entity.
// Example: given `Course` -> {"course": {}, "links": {}}
// this is one of the conventions for HATEOAS

// TODO: extract the middleware with relationships to a stand-alone
// controller?

// To support HATEOAS
// TODO: extract this functionality to a stand-alone file, so
// that it can be used in several controllers (without repetition).
const VERSION = "v1";
const RESOURCE = "courses";
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

// Function to format href for HATEOAS (given an ID)
const formatHref = (id) => {
    return `${HOST}:${PORT}/${VERSION}/${RESOURCE}/${id}`;
};

// Add a new course
router.post('/', (req, res, next) => {
    const course = new Course(req.body);
    const courseID = req.body.courseCode;
    const links = {
        "links": [
            {
                rel: "self",
                href: formatHref(courseID),
                method: "GET"
            },
            {
                rel: "update",
                href: formatHref(courseID),
                method: "PUT"
            },
            {
                rel: "edit",
                href: formatHref(courseID),
                method: "PATCH"
            },
            {
                rel: "delete",
                href: formatHref(courseID),
                method: "DELETE"
            }
        ]
    };
    course.save().catch(next);
    res.status(201).json({ course, ...links });
});

// Return the list of all courses
router.get('/', (req, res, next) => {

    const sortBy = req.query.sortBy || 'courseName';
    const order = req.query.order || 'ascending';
    const limit = req.query.limit || 100;

    let querySelector = {};
    querySelector[sortBy] = order;

    Course.find({}).sort(querySelector).limit(limit)
        .then((courses) => {
            res.json({ "courses": courses });
        })
        .catch(next);
});

// Delete all courses
router.delete('/', (_, res, next) => {
    Course.deleteMany({})
        .then(() => {
            // Note: code 204 indicates that no context is provided
            // and the request is completed.
            res.status(204).send();
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
            const links = {
                "links": [
                    {
                        rel: "update",
                        href: formatHref(courseID),
                        method: "PUT"
                    },
                    {
                        rel: "edit",
                        href: formatHref(courseID),
                        method: "PATCH"
                    },
                    {
                        rel: "delete",
                        href: formatHref(courseID),
                        method: "DELETE"
                    }
                ]
            };
            res.json({ course, ...links });
        }).catch(next);
});

// Update a whole course given an ID (PUT)
router.put('/:id', (req, res, next) => {
    const courseID = req.params.id;
    Course.findOne({ courseCode: courseID }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            // Update all fields of the given course
            course.courseName = req.body.courseName;
            course.courseStaff = req.body.courseStaff;
            course.dependencies = req.body.dependencies;

            const links = {
                "links": [
                    {
                        rel: "self",
                        href: formatHref(courseID),
                        method: "GET"
                    },
                    {
                        rel: "edit",
                        href: formatHref(courseID),
                        method: "PATCH"
                    },
                    {
                        rel: "delete",
                        href: formatHref(courseID),
                        method: "DELETE"
                    }
                ]
            };

            // Save and populate the response
            course.save().catch(next);
            res.json({ course, ...links });
        }).catch(next);
});

// Update a course partially (PATCH)
// Apply HATEOAS to the response
router.patch('/:id', (req, res, next) => {
    const courseID = req.params.id;
    Course.findOne({ courseCode: courseID }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            // Update only the provided fields
            course.courseName = req.body.courseName || course.courseName;
            course.courseStaff = req.body.courseStaff || course.courseStaff;
            course.dependencies = req.body.dependencies || course.dependencies;

            // Save and populate the response
            course.save().catch(next);

            // Add HATEOAS support
            const links = {
                "links": [
                    {
                        rel: "self",
                        href: formatHref(courseID),
                        method: "GET"
                    },
                    {
                        rel: "update",
                        href: formatHref(courseID),
                        method: "PUT"
                    },
                    {
                        rel: "delete",
                        href: formatHref(courseID),
                        method: "DELETE"
                    }
                ]
            };
            // Combine the resource Object with the links in the
            // body of the response.
            res.json({ course, ...links });
        }).catch(next);
});

// Delete a course given an ID
router.delete('/:id', (req, res, next) => {
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
// TODO: optimize this and check for exceptions
router.post('/:id/employees', (req, res, next) => {
    Course.findOne({courseCode : req.params.id}).exec()
    .then((course) => {
        if (course == null) {
            return res.status(404).json({
                message: "Course not found."
            })
        }

        // Create the employee
        const employee = new Employee(req.body);
        employee.save().catch(next);

        // Patch a course and assign the new employee to the course staff

        let newCourseStaff = course.courseStaff;
        newCourseStaff.push(req.body.emailAddress);

        course.courseStaff = newCourseStaff;

        // Save the changes that
        course.save().catch(next);
        res.json(course);
    })
})

// Get all employees of a given course
router.get('/:id/employees/', (req, res, next) => {
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
router.delete('/:id/employees/:employee_id', (req, res, next) => {
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

// Catch other undefined paths (404 - not found)
router.use('/:id/*', (_, res) => {
    res.status(404).json({ "message": "Not Found" });
});

module.exports = router;