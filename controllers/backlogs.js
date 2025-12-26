const express = require('express');
const router = express.Router();
const Backlog = require('../models/backlog');
const Item = require('../models/item');

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const backlog = await Backlog.create(req.body);
    res.status(201).json(backlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const backlogs = await Backlog.find({ userId: req.user._id });
    res.status(200).json(backlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:backlogId', async (req, res) => {
  try {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog) {
      return res.status(404).json({ error: 'Backlog not found' });
    }
    if (!backlog.userId.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.status(200).json(backlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:backlogId', async (req, res) => {
  try {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog) {
      return res.status(404).json({ error: 'Backlog not found' });
    }
    if (!backlog.userId.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const updatedBacklog = await Backlog.findByIdAndUpdate(
      req.params.backlogId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBacklog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:backlogId', async (req, res) => {
  try {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog) {
      return res.status(404).json({ error: 'Backlog not found' });
    }
    if (!backlog.userId.equals(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await Backlog.findByIdAndDelete(req.params.backlogId);
    res.status(200).json({ message: 'Backlog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;