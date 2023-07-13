const express = require('express');
const router = express.Router();
const bioService = require('../services/bioService');
const auth = require('../middlewares/auth');

router.get('/:id', auth, async (req, res) => {
  const bio = await bioService.getBio(req.params.id);
  res.json(bio);
});

module.exports = router;