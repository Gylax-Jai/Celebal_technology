const express = require('express');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/auth');

// dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Default protected route
app.get('/api/protected', require('./middleware/authmiddleware'), (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}. This is protected data.` });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
