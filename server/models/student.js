// Mongoose model for a Student

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentModel = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId, ref: "Course"
    }]
});

module.exports = mongoose.model("Student", StudentModel);
