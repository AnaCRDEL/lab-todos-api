const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json(error)
    }
});

module.exports = router;