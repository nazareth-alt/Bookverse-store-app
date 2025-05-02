const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Create new admin
router.post('/create-admin', verifyAdminToken, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists!' });
        }

        // Create a new admin user
        const newAdmin = new User({ username, password, role: 'admin' });
        await newAdmin.save();

        res.status(201).json({
            message: 'Admin user created successfully!',
            user: { username: newAdmin.username, role: newAdmin.role },
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Failed to create admin user' });
    }
});

// Login Admin and Get Token
router.post("/admin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin user by email
        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                email: admin.email,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(500).json({ message: "Failed to login as admin" });
    }
});

// Update Admin User (Protected)
router.put('/admins/:id', verifyAdminToken, async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        // Hash the new password if provided
        const updates = {};
        if (username) updates.username = username;
        if (password) updates.password = await bcrypt.hash(password, 10);

        // Find and update the admin user
        const updatedAdmin = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin user not found!' });
        }

        res.status(200).json({ message: 'Admin user updated successfully!', user: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin user:', error);
        res.status(500).json({ message: 'Failed to update admin user' });
    }
});

// Delete Admin User (Protected)
router.delete('/admins/:id', verifyAdminToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the admin user
        const deletedAdmin = await User.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin user not found!' });
        }

        res.status(200).json({ message: 'Admin user deleted successfully!', user: deletedAdmin });
    } catch (error) {
        console.error('Error deleting admin user:', error);
        res.status(500).json({ message: 'Failed to delete admin user' });
    }
});

module.exports = router;