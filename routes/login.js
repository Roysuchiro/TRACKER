import express from 'express';
import User from '../models/user.js';
import bcrypt from "bcryptjs";

const router = express.Router();

// Render login page
router.get('/', (req, res) => {
  res.render('login', { message: null, error: null });
});

// Handle login submission
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.render('login', { message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return res.redirect(`/dashboard/${user.uniqueCode}`);
      } else {
        return res.render('login', { message:  "Incorrect password. Try again." });
      }
    } else {
      return res.render('login', { message: "Invalid credentials. Try again." });
    }
  } catch (error) {
    console.error(error);
    return res.render('login', { message: null, error: "Error logging in. Try again." });
  }
});

export default router;
