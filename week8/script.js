const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const errorHandler = require('middleware/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
