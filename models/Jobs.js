// models/Job.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true,
    },
    applicants: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            status: {
                type: String,
                enum: ['Pending', 'Hired', 'Rejected'],
                default: 'Pending',
            }
        }
    ]
});

module.exports = mongoose.model('Job', jobSchema);
