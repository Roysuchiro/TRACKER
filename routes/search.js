import express from 'express';
import User from '../models/user.js'; // Assuming you have a User model

const router = express.Router();

// Render search page
router.get('/', (req, res) => {
  res.render('search'); // search.ejs page
});

// Handle user search by ID
router.post('/find', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ uniqueCode: userId }); // Assuming `uniqueCode` is the ID field
    if (user) {
      // If user is found, render the dashboard with user data
      res.render('dashboard', { user });
    } else {
      // If user is not found, redirect to registration page
      res.redirect('/register');
    }
  } catch (error) {
    res.status(500).send("Error searching for user");
  }
});

export default router;
