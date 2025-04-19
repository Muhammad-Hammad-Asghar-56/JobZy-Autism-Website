const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");

// Register a new employer
exports.registerEmployer = async (req, res) => {
    const {
        companyName,
        contactName,
        position,
        email,
        phoneNumber,
        industry,
        password,
        accommodations,
        termsAccepted,
    } = req.body;

    try {
        // Check if employer already exists
        const employerExists = await Employer.findOne({ email });
        if (employerExists) {
            return res.status(404).json({ message: "Employer already exists" });
        }

        // Create a new employer
        const employer = new Employer({
            companyName,
            contactName,
            position,
            email,
            phoneNumber,
            industry,
            password,
            accommodations,
            termsAccepted,
        });

        // Save the employer to the database
        await employer.save();

        // Send success response
        res.status(201).json({ message: "Employer registered successfully", user: employer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login for the employer
exports.loginEmployer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employer = await Employer.findOne({ email });
        if (!employer) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Here, for simplicity, we're matching the email and phone number directly
        if (employer.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Save the employer session (for authentication purposes)
        req.session.employerId = employer._id;

        res.json({ message: "Logged in successfully", user: employer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update field for the employer (e.g., updating jobs or other details)
exports.updateEmployerField = async (req, res) => {
    const { fieldToEdit, obj } = req.body; // fieldToEdit is the field to update (e.g., job postings)

    try {
        // Ensure the employer is logged in
        if (!req.session.employerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Find the employer by session ID
        const employer = await Employer.findById(req.session.employerId);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // If we are updating the 'jobs' field, replace the jobs array with the provided one
        if (fieldToEdit === "jobs") {

            // Validate each job object to ensure it contains the required fields
            for (let i = 0; i < obj.length; i++) {
                const { title, description, location, salary, jobType, requirements } = obj[i];

                if (!title || !description || !location || !salary || !jobType || !requirements) {
                    return res.status(400).json({ message: `All job fields are required for job ${i + 1}.` });
                }
            }

            // Replace the current jobs array with the new one
            employer.jobs = obj;
        } else {
            // Update other fields dynamically
            employer[fieldToEdit] = obj;
        }

        // Save the updated employer document
        await employer.save();

        res.status(200).json({ message: "Employer updated successfully", user: employer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Login for the employer
exports.getEmployer = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is not provided" });
    }
    try {
        const employer = await Employer.findById(id);
        if (!employer) {
            return res.status(400).json({
                message: "Invalid Id"
            });
        }

        res.json({ message: "success", user: employer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteEmployer = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Employer.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Delete the user from the database using deleteOne
        await User.deleteOne({ _id: user._id });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
