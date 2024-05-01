const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error });
    }
});

module.exports = router;
