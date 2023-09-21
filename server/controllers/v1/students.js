/**
 * controllers/v1/students.js
 * 
 * @description :: CRUD operations for the Student entity.
 * @version     :: 1.0
 */

const express = require("express");
const Student = require("../../models/student");
const Course = require("../../models/course");
const router = express.Router();
const validateCourseCodes = require("../../utils/utils");
const { formatHref } = require('./config');

const RESOURCE = "students";

// Add a new student
router.post('/', (req, res, next) => {
    validateCourseCodes(req.body.courses)
        .then((courseIds) => {

            const studentSSN = req.body.SSN;
            const student = new Student({
                SSN: studentSSN,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                courses: courseIds
            });
            const links = [
                {
                    rel: "self",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "GET"
                },
                {
                    rel: "update",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PUT"
                },
                {
                    rel: "edit",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PATCH"
                },
                {
                    rel: "delete",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "DELETE"
                }
            ];

            student.save().catch(next);
            res.status(201).json({ student, links });
        }).catch((error) => {
            res.status(400).json({ "message": error.message });
        });
});

// Get list of all students
router.get('/', (_, res, next) => {
    Student.find({})
        .then((students) => {
            res.json({ "students": students });
        })
        .catch(next);
});

// Delete all students
router.delete('/', (_, res, next) => {
    Student.deleteMany({})
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

// Get student by ID
router.get('/:id', (req, res, next) => {
    const studentSSN = req.params.id;
    Student.findOne({ SSN: studentSSN }).exec()
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }
            const links = [
                {
                    rel: "update",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PUT"
                },
                {
                    rel: "edit",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PATCH"
                },
                {
                    rel: "delete",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "DELETE"
                }
            ];
            res.json({ student, links });
        }).catch(next);
});

// Update all student fields given an ID
router.put('/:id', (req, res, next) => {
    const studentSSN = req.params.id;
    Student.findOne({ SSN: studentSSN }).exec()
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }

            validateCourseCodes(req.body.courses)
                .then((courseIds) => {
                    student.firstName = req.body.firstName;
                    student.lastName = req.body.lastName;
                    student.courses = courseIds;
                }).catch((error) => {
                    return res.status(400).json({
                        "message": error.message
                    });
                });

            const links = [
                {
                    rel: "self", 
                    href: formatHref(RESOURCE, studentSSN),
                    method: "GET"
                },
                {
                    rel: "edit",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PATCH"
                },
                {
                    rel: "delete",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "DELETE"
                }
            ];
              
            // Save updated student, resolve promise before sending response
            student.save().then((student) => {
                res.json({ student, links });
            }).catch(next); // perhaps too verbose - leaving it in for now (for consistency)
        }).catch(next);
});

// Partially update a student given an ID
router.patch('/:id', (req, res, next) => {
    const studentSSN = req.params.id;
    Student.findOne({ SSN: studentSSN }).exec()
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }

            if ("courses" in req.body) {
                validateCourseCodes(req.body.courses)
                    .then((courseIds) => {
                        student.courses = courseIds;
                    }).catch((error) => {
                        return res.status(400).json({
                            "message": error.message
                        });
                    });
            }
            student.firstName = req.body.firstName || student.firstName;
            student.lastName = req.body.lastName || student.lastName;

            const links= [
                {
                    rel: "self",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "GET"
                },
                {
                    rel: "update",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "PUT"
                },
                {
                    rel: "delete",
                    href: formatHref(RESOURCE, studentSSN),
                    method: "DELETE"
                }
            ];
            student.save().then((updatedStudent) => {
                res.json({ "student": updatedStudent });
            }).catch(next);
        }).catch(next);
});

// Delete a specific student given an ID
router.delete('/:id', (req, res, next) => {
    const studentSSN = req.params.id;
    Student.findOneAndDelete({ SSN: studentSSN })
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }
            res.json({ "student": student });
        }).catch(next);
});

// Get all courses of a given student
router.get('/:id/courses', (req, res, next) => {
    const studentSSN = req.params.id;
    Student.findOne({ SSN: studentSSN }).exec()
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }
            Course.find({ _id: { $in: student.courses } }).exec()
                .then((courses) => {
                    if (courses == null) {
                        return res.status(404).json({
                            "message": "Courses not found."
                        });
                    }
                    res.json({ "courses": courses });
                }).catch(next);
        }).catch(next);
});

// Get a specific course of a given student
router.get('/:id/courses/:course_id', (req, res, next) => {
    const studentSSN = req.params.id;
    const courseCode = req.params.course_id;

    Student.findOne({ SSN: studentSSN }).exec()
        .then((student) => {
            if (student == null) {
                return res.status(404).json({
                    "message": "Student not found."
                });
            }
            validateCourseCodes([courseCode])
                .then((course) => {
                    if (!student.courses.includes(course)) {
                        return res.status(404).json({
                            "message": `${studentSSN} is not enrolled in ${courseCode}.`
                        });
                    }
                    Course.find({ _id: course }).exec()
                        .then((courses) => {
                            if (courses == null) {
                                return res.status(404).json({
                                    "message": "Courses not found."
                                });
                            }
                            res.json({ "course": courses });
                        }).catch(next);
                }).catch((error) => {
                    return res.status(404).json({
                        "message": error.message
                    });
                });
        }).catch(next);
});

// TODO: Delete a relationship between a student and a course

// Catch other undefined paths (404 - not found)
router.use('/:id/*', (_, res) => {
    res.status(404).json({ "message": "Not Found" });
});

module.exports = router;
