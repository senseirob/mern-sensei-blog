const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//-----------------------------------------------------
// @route    GET api/users
// @desc     Test route
// @access   Public
//-----------------------------------------------------

router.get('/', (req, res) => res.send('users route working'));

//-----------------------------------------------------
// @route    POST api/users
// @desc     Register a new user
// @access   Public
//-----------------------------------------------------

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    const { name, email, password } = req.body;

    try {
      //1. See if the user already exists
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //2. Get the user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // 3. Create a new instance of a user

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //4. Ecrypt the password using bcrypt

      const salt = await bcrypt.genSalt(10);
      // salt is an ecncrypted password
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //5. Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      console.log(user);

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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
