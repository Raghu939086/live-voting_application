const express = require('express');
const Vote = require('../models/Vote');
const router = express.Router();
const OPTIONS = ['Option A', 'Option B', 'Option C'];

// Initialize voting options if missing in DB
(async () => {
  for (const option of OPTIONS) {
    if (!await Vote.findOne({ option })) {
      await new Vote({ option }).save();
    }
  }
})();

router.get('/options', (req, res) => {
  res.json(OPTIONS);
});

router.get('/results', async (req, res) => {
  try {
    const votes = await Vote.find();
    const voteMap = {};
    votes.forEach(v => voteMap[v.option] = v.count);
    res.json(voteMap);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching results' });
  }
});

router.post('/vote', async (req, res) => {
  const { option } = req.body;
  if (!OPTIONS.includes(option)) return res.status(400).json({ message: 'Invalid option' });
  if (req.session.voted) return res.status(403).json({ message: 'You used your 1 chance vote come Again After 24 hours  ' });

  try {
    const vote = await Vote.findOne({ option });
    if (vote) {
      vote.count += 1;
      await vote.save();
      req.session.voted = true;

      // Emit updated votes live via Socket.IO
      const io = req.app.get('socketio');
      const votes = await Vote.find();
      const voteMap = {};
      votes.forEach(v => voteMap[v.option] = v.count);
      io.emit('votesUpdated', voteMap);

      res.json({ message: 'Vote recorded' });
    } else {
      res.status(400).json({ message: 'Option not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error casting vote' });
  }
});

module.exports = router;
