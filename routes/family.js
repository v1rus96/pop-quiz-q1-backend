const express = require('express');
const router = express.Router();
const familyService = require('../services/familyService');
const auth = require('../middlewares/auth');

router.get('/:id', auth, async (req, res) => {
  const family = await familyService.getFamily(req.params.id);
  res.json(family);
});

module.exports = router;