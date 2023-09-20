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
    courseStaff: [{
        type: String, // unique email
        trim: true,
        required: true
    }],
    dependencies: [{
        type: String, // unique courseCode
        trim: true
    }]
});

module.exports = mongoose.model("Course", CourseModel);