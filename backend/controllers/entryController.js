const Entry = require('../models/Entry'); // Assuming you have an Entry model set up

// @desc    Create a new entry
// @route   POST /api/entries
// @access  Private
const createEntry = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    // Create a new entry
    const newEntry = new Entry({
      user: req.user.id, // Assuming you have user authentication
      title,
      content,
      mood,
    });

    // Save the entry to the database
    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating entry', error });
  }
};

// @desc    Get all entries for a user
// @route   GET /api/entries
// @access  Private
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error while retrieving entries', error });
  }
};

// @desc    Get a single entry
// @route   GET /api/entries/:id
// @access  Private
const getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to view this entry' });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error while retrieving the entry', error });
  }
};

// @desc    Update an entry
// @route   PUT /api/entries/:id
// @access  Private
const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this entry' });
    }

    // Update the entry fields
    entry.title = req.body.title || entry.title;
    entry.content = req.body.content || entry.content;
    entry.mood = req.body.mood || entry.mood;

    const updatedEntry = await entry.save();
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating entry', error });
  }
};

// @desc    Delete an entry
// @route   DELETE /api/entries/:id
// @access  Private
const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this entry' });
    }

    await entry.remove();
    res.status(200).json({ message: 'Entry removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting entry', error });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
};

