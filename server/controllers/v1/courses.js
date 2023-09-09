/**
 * controllers/v1/courses.js
 * 
 * @description :: CRUD operations for the Course entity.
 * @version     :: 1.0
 */

const express   = require('express');
const router    = express.Router();
const Course    = require('../../models/course');

// TODO: add CRUD operations with relationships

// To support HATEOAS
// TODO: extract this functionality to a stand-alone file, so
// that it can be used in several controllers (without repetition).
const VERSION   = "v1"
const RESOURCE  = "courses"
const PORT      = process.env.PORT || 3000;
const HOST      = process.env.HOST || "http://localhost";
 
// Function to format href for HATEOAS (given an ID)
const formatHref = (id) => {
    return`${HOST}:${PORT}/${VERSION}/${RESOURCE}/${id}`;
};

// Add a new course
router.post('/', (req, res, next) => {
    const course = new Course(req.body);
    course.save().catch(next);
    res.status(201).json(course);
});

// Return the list of all courses
router.get('/', (_, res, next) => {
    Course.find({})
        .then((courses) => {
            res.json(courses);
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
    Course.findOne({ courseCode: req.params.id }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            res.json(course);
        }).catch(next);
});

// Update a whole course given an ID (PUT)
router.put('/:id', (req, res, next) => {
    Course.findOne({ courseCode: req.params.id }).exec()
        .then((course) => {
            if (course == null) {
                return res.status(404).json({
                    "message": "Course not found."
                });
            }
            // Update all fields of the given course
            course.courseName   = req.body.courseName;
            course.courseStaff  = req.body.courseStaff;
            course.dependencies = req.body.dependencies;

            // Save and populate the response
            course.save().catch(next);
            res.json(course);
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
            course.courseName   = req.body.courseName   || course.courseName;
            course.courseStaff  = req.body.courseStaff  || course.courseStaff;
            course.dependencies = req.body.dependencies || course.dependencies;

            // Save and populate the response
            course.save().catch(next);

            // Add HATEOAS support
            const links = {
                "links": [
                    {
                        rel: 'self',
                        href: formatHref(courseID),
                        method: 'GET'
                    },
                    {
                        rel: 'delete',
                        href: formatHref(courseID),
                        method: 'DELETE'
                    },
                    {
                        rel: 'update',
                        href: formatHref(courseID),
                        method: 'PUT'
                    }
                ]
            };
            // Combine the resource Object with the links in the
            // body of the response.
            res.json({course, ...links});
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
            res.json(course);
        }).catch(next);
});

module.exports = router;