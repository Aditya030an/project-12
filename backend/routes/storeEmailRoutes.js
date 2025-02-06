const express = require("express");
const Email = require("../models/Email.js"); // Correct path to your Email model

const router = express.Router();

router.post("/saveEmail", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const newEmail = new Email({
            email,
        });

        await newEmail.save();
        res.status(201).json({ message: "Email saved successfully" });
    } catch (error) {
        console.error("Error saving email:", error);

        if (error.code === 11000 && error.name === "MongoError") { // Check for duplicate key error
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
});

module.exports = router;