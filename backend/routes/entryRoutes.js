const express = require('express');
const { createEntry, getEntries } = require('../controllers/entryController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth, getEntries);

module.exports = router;
