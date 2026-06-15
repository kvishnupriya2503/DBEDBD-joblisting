const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    jobId: {
        type: Number,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    description: {
        type: String,
        required: true
    },

    salary: {
        type: String
    },

    skills: {
        type: [String]
    }

},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);