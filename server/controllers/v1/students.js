/**
 * controllers/v1/students.js
 * 
 * @description :: CRUD operations for the Student entity.
 * @version     :: 1.0
 */

const express               = require("express");
const Student               = require("../../models/student");
const Course                = require("../../models/course");
const validateCourseCodes   = require("./courseCodeValidation");
const router                = express.Router();

// Add a new student
router.post('/', (req, res, next) => {
    validateCourseCodes(req.body.courses)
        .then((courseIds) => {

            const student = new Student({
                SSN:        req.body.SSN,
                firstName:  req.body.firstName,
                lastName:   req.body.lastName,
                courses:    courseIds
            });

            student.save().catch(next);
            res.status(201).json({"student": student});
        }).catch((error) => {
            res.status(400).json({ "message": error.message});
        });
});

// Get list of all students
router.get('/', (_, res, next) => {
    Student.find({})
        .then((students) => {
            res.json({"students": students}); 
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
            res.json({ "student": student });
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
            })
        }

        validateCourseCodes(req.body.courses)
        .then((courseIds) => {
            student.firstName   = req.body.firstName;
            student.lastName    = req.body.lastName;
            student.courses     = courseIds;
        }).catch((error) => {
            return res.status(400).json({ 
                "message": error.message
            });
        })

        // Save updated student, resolve promise before sending response
        student.save().then((updatedStudent) => {
            res.json({ "student": updatedStudent });
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
            })
        }
        
        if ("courses" in req.body) {
            validateCourseCodes(req.body.courses)
            .then((courseIds) => {
                student.courses = courseIds;
            }).catch((error) => {
                return res.status(400).json({
                    "message": error.message
                });
            })
        }
        student.firstName   = req.body.firstName    || student.firstName;
        student.lastName    = req.body.lastName     || student.lastName;

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
        res.json({ "student": student })
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
            Course.find( {_id: { $in: student.courses }} ).exec()
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
    const studentSSN    = req.params.id;
    const courseCode    = req.params.course_id;

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
                    Course.find( {_id: course } ).exec()
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
