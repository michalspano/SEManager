// File: ./models/course.js
// A mongoose model for a Course

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Add employee name
const EmployeeModel = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        required: true
    },
    contactInfo: String
})

module.exports = mongoose.model("Employee", EmployeeModel);