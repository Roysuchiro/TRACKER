// In routes/dashboard.js
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/:uniqueCode', async (req, res) => {
  const { uniqueCode } = req.params;

  try {
    const user = await User.findOne({ uniqueCode });
    if (user) {
      res.render('dashboard', { user });  // Pass user object to view
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

export default router;
