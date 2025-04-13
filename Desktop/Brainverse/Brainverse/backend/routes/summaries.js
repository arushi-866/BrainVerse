const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-summary', async (req, res) => {
  try {
    const { userId, summary } = req.body;

    if (
      !userId ||
      !summary ||
      typeof summary.id !== 'number' ||
      typeof summary.title !== 'string' ||
      typeof summary.date !== 'string' ||
      typeof summary.likes !== 'number' ||
      typeof summary.comments !== 'number'
    ) {
      return res.status(400).json({ message: 'Invalid summary format or missing userId' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.summaries.push(summary);
    user.stats.summaries = (user.stats.summaries || 0) + 1;

    await user.save();

    res.status(200).json({ message: 'Summary saved successfully', summary });
  } catch (err) {
    console.error('Add summary error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
