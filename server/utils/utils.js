/**
 * utils/utils.js
 * 
 * @description :: Utility functions for the Node.js server.
 * @version     :: 1.0
 */

const Course = require("../models/course");

/**
 * Returns the list (or a single value) of course._id values corresponding to the
 * valid course code(s). Function returns an error if any of the courses is invalid.
 * @param {Array} courseCodes - An array of course codes to validate
 * @returns {Promise} Promise object representing the list of course._id values
 */
const validateCourseCodes = async (courseCodes) => {
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

module.exports = validateCourseCodes;