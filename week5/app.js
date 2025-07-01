// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Item = require('./models/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// CREATE
app.post('/items', async (req, res) => {
  try {
   const{name,quantity}=req.body;
   const savedItem=await Item.create({name,quantity});
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (all items)
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// READ (by id)
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("Item not found");
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put('/items/:id', async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send("Item not found");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/items/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Item not found");
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
