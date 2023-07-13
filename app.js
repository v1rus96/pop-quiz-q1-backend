const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const bioRoutes = require('./routes/bio');
const familyRoutes = require('./routes/family');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// DB Connection
mongoose.connect('mongodb+srv://admin:admin@ktrialinfo.kbp1y.mongodb.net/?retryWrites=true&w=majority');

app.use(cors());
app.use(express.json());  // Parse JSON request body

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });  // Global error handler
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
