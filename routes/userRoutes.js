const express = require('express');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({ username, email, password});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.status(201).json({user, token});
    } catch (err) {

        res.status(400).json({message: err.message});
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const User = await User.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Invalid token'});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({user, token});
});

module.exports = router;
