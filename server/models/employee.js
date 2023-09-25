// File: ./models/employees.js
// A mongoose model for a Employee

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeModel = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String
    }
});

module.exports = mongoose.model("Employee", EmployeeModel);