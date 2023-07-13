const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const token = await authService.login(username, password);
  res.json({token});
});

module.exports = router;
