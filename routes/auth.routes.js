const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = Router();

function validateEmail(email) {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    return re.test(String(email).toLowerCase());
}

router.post('/signup', async (request, response) => {
    const { name, email, todos, password } = request.body;
    try {
        if (!validateEmail(email)) {
        throw new Error('invalid email')
        }
        const userEmail = await User.findOne({ email });
        if (userEmail) {
        throw new Error('email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          name,
          email,
          todos,
          password: passwordHash
        });
        response.status(201).json({
            name: newUser.name,
            email: newUser.email,
          });
    } catch (error) {
            response.status(500).json({ error: error.message });
    }
});

module.exports = router;