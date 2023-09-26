// File: ./models/course.js
// A mongoose model for a Course

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseModel = new Schema({
    courseCode: {
        type: String,
        unique: true,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    courseStaff: [{
        type: String, // unique email
        trim: true,
        required: true
    }],
    // Note: the dependencies are course codes, not the IDs and the reason
    // is that the course codes are unique identifiers of a course; furthermore
    // storing the course codes is more convenient for the client (that is, when
    // a new course is created, the client can just send the course codes of the
    // dependencies, instead of the IDs).
    dependencies: [{
        type: String, // unique courseCode
        trim: true
    }]
});

module.exports = mongoose.model("Course", CourseModel);