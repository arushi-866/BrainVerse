const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add-mindmap', async (req, res) => {
  try {
    const { userId, mindMap } = req.body;

    if (
      !userId || 
      !mindMap || 
      typeof mindMap.id !== 'number' || 
      typeof mindMap.title !== 'string' || 
      typeof mindMap.date !== 'string' || 
      typeof mindMap.nodes !== 'number'
    ) {
      return res.status(400).json({ message: 'Invalid mind map format or missing userId' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.mindMaps.push(mindMap);
    user.stats.mindMaps = (user.stats.mindMaps || 0) + 1;

    await user.save();

    res.status(200).json({ message: 'Mind map saved successfully', mindMap });
  } catch (err) {
    console.error('Add mind map error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
