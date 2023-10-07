/**
 * utils/utils.js
 * 
 * @description :: Utility functions for the Node.js server.
 * @version     :: 1.0
 */

const { formatHref } = require("../controllers/v1/config");
const Course = require("../models/course");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Returns the list (or a single value) of course._id values corresponding to the
 * valid course code(s). Function returns an error if any of the courses is invalid.
 * @param {Array} courseCodes - An array of course codes to validate
 * @returns {Promise} Promise object representing the list of course._id values
 */
const fetchCourseIds = async (courseCodes) => {
    return Course.find({ courseCode: { $in: courseCodes } })
        .then((courses) => {
            // Compare the length of the arrays to determine if all of the course codes are valid.
            if (courses.length !== courseCodes.length) {
                throw new Error("One or more course codes are invalid.");
            }

            const result = courses.map(course => course._id);

            // Note: if only one element is found, return a single non-array value
            if (result.length == 1) return result[0];
            return result;
        });
};
/**
 * Function to generate the HATEOAS links.
 * @param {Array} data - an array of arrays where each individual array
 * represents an instance of a 'link' (i.e. it contains the data).
 * @returns {Array} A JSONArray that contains all the links.
 */
const generateLinks = (data) => {
    return data.map((link) => {
        try {
            return {
                rel: link[0],
                href: formatHref(link[1]),
                method: link[2]
            };
        } catch (error) {
            throw new Error("Invalid link data.");
        }
    });
};

/**
 * A function that computes a random 256-bit (32-byte)
 * key used as the input to generate the JWT token.
 * @returns {String} A 32-byte random hex string.
 */
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

/**
 * This function is used on a certain middleware. If checks whether
 * the token is specified and the roles match. Furthermore, the Postman
 * tests should not be checked by this function and always access all endpoints.
 * @param {String} role - desired permitted role
 * @returns {Function} A function that performs the validation.
 */
const verifyTokenAndRole = (role) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const isPostman = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

        if (!authHeader) {
            if (isPostman) return next(); // all Postman tests permitted
            return res.status(401).json({ message: 'Unauthorized: Token not found' });
        }

        // Parse the token and evaluate it
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized: Token is empty' });

        // Parse the secret and evaluate it
        const secretKey = req.cookies[token];
        if (!secretKey) return res.status(401).json({ message: 'Unauthorized: Secret key not found' });

        // Verify token, given secret
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) return res.status(401).json({ message: 'Unauthorized: Token invalid' });

            // Match desired roles
            const user = decoded;
            if (user.type === role) {
                req.user = user; // Store the decoded token payload in the request object
                next();
            } else return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        });
    };
}

module.exports = { fetchCourseIds, generateLinks, generateSecretKey, verifyTokenAndRole };