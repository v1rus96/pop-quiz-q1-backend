const express = require('express');
const router = express.Router();
const dashboardService = require('../services/dashboardService');
const auth = require('../middlewares/auth');

router.get('/:id', auth, async (req, res) => {
  const dashboard = await dashboardService.getDashboard(req.params.id);
  res.json(dashboard);
});

module.exports = router;