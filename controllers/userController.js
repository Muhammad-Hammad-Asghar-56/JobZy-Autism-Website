const User = require("../models/User");
const bcrypt=require("bcryptjs");
exports.registerUser = async (req, res) => {
    const {
        title,
        firstName,
        lastName,
        position,
        phoneNumber,
        additionalInfo,
        street,
        zipCode,
        country,
        email,
        password
    } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            title,
            firstName,
            lastName,
            position,
            phoneNumber,
            additionalInfo,
            street,
            zipCode,
            country,
            email,
            password,
        });

        await user.save(); // Save the new user to MongoDB

        req.session.userId = user._id; // Store user ID in session
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        req.session.userId = user._id; // Store user ID in session

        res.json({ message: "Logged in successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
};

exports.getUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.update = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const { fieldToEdit, obj } = req.body; // Destructure the request body to get the field to edit and the object to update

    try {
        const user = await User.findById(req.session.userId); // Find the user by their session ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the fieldToEdit is 'workExperience', we handle it separately
        if (fieldToEdit === "workExperience") {
            // Add the new work experience object to the workExperience array
            user.workExperience.push(obj); // Assuming `obj` is the work experience object
        } else {
            // Update the field in the user's profile
            user[fieldToEdit] = obj; // Dynamically set the field to edit
        }

        await user.save(); // Save the updated user document
        res.status(200).json({ message: "User updated successfully", user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

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
