const mongoose = require("mongoose");

// Define the Employer schema
const employerSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        contactName: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        accommodations: {
            type: String,
            required: false, // Optional field
        },
        termsAccepted: {
            type: Boolean,
            required: true,
        },
        jobs: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                    required: true,
                },
                salary: {
                    type: String,
                    required: true,
                },
                requirements: {
                    type: String,
                    required: true,
                },
                jobType: {
                    type: String,
                    required: true,
                },
            },
        ], // Jobs array to store multiple job postings
        passedTest: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true, // Add createdAt and updatedAt timestamps
    }
);

// Create and export the Employer model
module.exports = mongoose.model("Employer", employerSchema);
