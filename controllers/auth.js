const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });

    if (userInDatabase) {
      return res.status(409).json({
        err: 'Username or Password is invalid',
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.hashedPassword = hashedPassword;

    const newUser = await User.create(req.body);

    const payload = {
      username: newUser.username,
      _id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong!' });
  }
});

module.exports = router;
