const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the General User
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // title could be like Mr., Mrs., etc.
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true, // User's job position
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
        required: false, // Optional field for extra information
    },
    street: {
        type: String,
        required: true, // User's street address
    },
    zipCode: {
        type: String,
        required: true, // Zip code for the address
    },
    country: {
        type: String,
        required: true, // Country of the user
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "GeneralUser"
    }, skills: {
        type: [String],
        default: []
    },
    workExperience: [
        {
            jobTitle: {
                type: String,
                required: true,
            },
            companyName: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            skills: {
                type: String, // A string that holds the skills used in the job
                required: true,
            },
            location: {
                type: String, // The location where the user worked
                required: true,
            },
        },
    ], strength_Weakness: {
        categoryAverages: {
            socialInteraction: { type: Number, default: 0 },
            communication: { type: Number, default: 0 },
            behavioralPatterns: { type: Number, default: 0 },
            sensoryProcessing: { type: Number, default: 0 },
        },
        weaknesses: {
            type: String,
            default: "",
        },
        strengths: {
            type: String,
            default: "",
        },
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to match the password
userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
module.exports = mongoose.model("User", userSchema);
