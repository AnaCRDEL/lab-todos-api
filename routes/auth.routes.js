const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            response.status(500).json({message: 'Error while creating user', error: error.message });
    }
});

router.post('/login', async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('email not found');
    }
    const compareHash = bcrypt.compareSync(password, user.password);

    if (!compareHash) {
      throw new Error('email or password incorrect');
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '1day' },
    );

    response.status(200).json({ payload, token });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

module.exports = router;