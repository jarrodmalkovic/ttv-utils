const express = require('express');
const router = express.Router();

const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
  try {
    const { username, type, text } = req.body;

    const feedback = new Feedback({ username, type, text });

    await feedback.save();

    res.status(200).send(`${type} sent successfully!`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
