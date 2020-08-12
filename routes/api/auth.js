const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//-----------------------------------------------------
// @route    GET api/auth
// @desc     Get auth user
// @access   Public
//-----------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//-----------------------------------------------------
// @route    POST api/auth
// @desc     Authenticate a user and give them a x-auth token
// @access   Private
//-----------------------------------------------------

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log('post route is working');

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
