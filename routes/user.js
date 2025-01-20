import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/:uniqueCode', async (req, res) => {
  const { uniqueCode } = req.params;

  try {
    const user = await User.findOne({ uniqueCode });

    if (user) {
      res.render('user_dashboard', { user });
    } else {
      res.render('index', { error: 'User not found!' });
    }
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Error fetching user. Please try again.' });
  }
});

export default router;
