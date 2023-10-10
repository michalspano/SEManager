/**
 * controllers/v1/users.js
 * 
 * @description :: CRUD operations for the User entity.
 * @version     :: 1.0
 */

const express = require("express");
const User = require("../../models/user");
const Course = require("../../models/course");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { fetchCourseIds, generateLinks, generateSecretKey } = require("../../utils/utils");
const { verifyTokenAndRole } = require('../../utils/utils')

const RESOURCE = "users";

// Note: because the User entity contains sensitive information, like password or
// e-mail address, only the admin can get the instances of this entity.

// Add a new User
router.post('/', verifyTokenAndRole('admin'), (req, res, next) => {
    fetchCourseIds(req.body.courses)
        .then(async (courseIds) => {

            let hashed;
            const userId = req.body.emailAddress;

            try {
                hashed = await bcrypt.hash(req.body.password, 10);
            } catch (error) {
                return res.status(400).json({ message: "The password count not be created." })
            }

            // Create a user instance with the attributes
            const user = new User({
                emailAddress: userId,
                password: hashed,
                type: req.body.type,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                courses: courseIds
            });

            const links = generateLinks([
                ["self", [RESOURCE, userId], "get"],
                ["update", [RESOURCE, userId], "PUT"],
                ["edit", [RESOURCE, userId], "PATCH"],
                ["delete", [RESOURCE, userId], "DELETE"]
            ]);

            user.save()
                .then(() => {
                    res.status(201).json({ user, links });
                }).catch((error) => {
                    if (error.code === 11_000) {
                        res.status(409).json({ error: "User with this unique key already exists" });
                    } else next(error);
                });
        });
});

// Get list of all users
router.get('/', verifyTokenAndRole('admin'), (_, res, next) => {
    User.find({})
        .then((users) => {
            res.json({ "users": users });
        })
        .catch(next);
});

// Delete all users
router.delete('/', verifyTokenAndRole('admin'), (_, res, next) => {
    User.deleteMany({})
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

// Get user by ID
router.get('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    const userId = req.params.id;
    User.findOne({ emailAddress: userId }).exec()
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }

            const links = generateLinks([
                ["update", [RESOURCE, userId], "PUT"],
                ["edit", [RESOURCE, userId], "PATCH"],
                ["delete", [RESOURCE, userId], "DELETE"]
            ]);

            res.json({ user, links });
        }).catch(next);
});

router.post('/auth/:id', (req, res, next) => {
    const userId = req.params.id;
    const password = req.body.password;
    User.findOne({ emailAddress: userId }).exec()
        .then(async (user) => {
            if (user == null) {
                return res.status(404).json({ "message": "User not found." });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    "verified": false,
                    "message": "Verification failed"
                });
            }

            const tokenPayload = {
                userId: userId,
                type: user.type
            };

            const secretKey = generateSecretKey();

            // Generate a token based on the payload, use the secret key
            // Cache the secret key in the cookie. Both the secret key and the token
            // are required to verify the token and are valid for 1 hour.
            const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
            res.cookie(token, secretKey, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                sameSite: false, // client and server operate on different domains
                                 // FIXME: for production, this should be fixed
                secure: true
            });

            return res.json({
                "verified": true,
                "token": token,
                "verificationDate": new Date(),
                "message": "Verification successful"
            });

        }).catch(next);
});

// Update all users fields given an ID
router.put('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    const userId = req.params.id;
    User.findOne({ emailAddress: userId }).exec()
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }

            fetchCourseIds(req.body.courses)
                .then((courseIds) => {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.courses = courseIds;
                }).catch((error) => {
                    return res.status(400).json({
                        "message": error.message
                    });
                });

            const links = generateLinks([
                ["self", [RESOURCE, userId], "GET"],
                ["edit", [RESOURCE, userId], "PATCH"],
                ["delete", [RESOURCE, userId], "DELETE"]
            ]);

            // Save updated user, resolve promise before sending response
            user.save().then((user) => {
                res.json({ user, links });
            }).catch(next); // perhaps too verbose - leaving it in for now (for consistency)
        }).catch(next);
});

// Partially update a user given an ID
router.patch('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    const userId = req.params.id;
    User.findOne({ emailAddress: userId }).exec()
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }

            if ("courses" in req.body) {
                fetchCourseIds(req.body.courses)
                    .then((courseIds) => {
                        user.courses = courseIds;
                    }).catch((error) => {
                        return res.status(400).json({
                            "message": error.message
                        });
                    });
            }
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;

            const links = generateLinks([
                ["self", [RESOURCE, userId], "GET"],
                ["update", [RESOURCE, userId], "PUT"],
                ["delete", [RESOURCE, userId], "DELETE"]
            ]);

            user.save().then((updatedUser) => {
                res.json({ updatedUser, links });
            }).catch(next);
        }).catch(next);
});

// Delete a specific user given an ID
router.delete('/:id', verifyTokenAndRole('admin'), (req, res, next) => {
    const userId = req.params.id;
    User.findOneAndDelete({ emailAddress: userId })
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }
            res.json({ "user": user });
        }).catch(next);
});

// Get all courses of a given user
router.get('/:id/courses', verifyTokenAndRole('student'), (req, res, next) => {
    const userId = req.params.id;
    User.findOne({ emailAddress: userId }).exec()
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }
            Course.find({ _id: { $in: user.courses } }).exec()
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

// Get a specific course of a given user
router.get('/:id/courses/:course_id', verifyTokenAndRole('student'), (req, res, next) => {
    const userId = req.params.id;
    const courseCode = req.params.course_id;

    User.findOne({ emailAddress: userId }).exec()
        .then((user) => {
            if (user == null) {
                return res.status(404).json({
                    "message": "User not found."
                });
            }
            fetchCourseIds([courseCode])
                .then((course) => {
                    if (!user.courses.includes(course)) {
                        return res.status(404).json({
                            "message": `${userId} is not enrolled in ${courseCode}.`
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

module.exports = router;
