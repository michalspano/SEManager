// Helper function to modularise validation of course codes.

const Course = require("../../models/course");

// Returns the list of course._id values corresponding to the valid course codes.
// Function returns an error if any are invalid.
function validateCourseCodes(courseCodes) {
    return Course.find({ courseCode: { $in: courseCodes} })
        .then((courses) => {
            // Compare the length of the arrays to determine if all of the course codes are valid.
            if (courses.length !== courseCodes.length) {
                throw new Error("One or more course codes are invalid.");
            }

            return courses.map(course => course._id);
        });
}

module.exports = validateCourseCodes;