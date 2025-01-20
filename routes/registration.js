import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/user.js'; // Ensure the correct path to your User model

const router = express.Router();

router.get('/', (req, res) => {
  res.render('registration', { message: null, error: null }); // Always pass null for message and error
});

router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if any field is missing
    if (!email || !name || !phone || !password) {
      return res.render('registration', { message: null, error: 'All fields are required' });
    }

    // Check if the user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.render('login', { message: 'User already exists. Please login to continue', error: null });
    }

    // Generate a unique code for the user
    const uniqueCode = crypto.randomBytes(4).toString('hex');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ name, email, phone, password: hashedPass, uniqueCode });
    await user.save();

    // Successful registration message
    return res.render('login', { message: 'Registration successful! Login to get your unique code.', error: null });
  } catch (error) {
    console.error(error);
    return res.render('registration', { message: null, error: 'Error registering user. Try again.' });
  }
});

export default router;

