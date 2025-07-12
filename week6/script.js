const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/productsDB",{tls:true}).then(() => {
  console.log(" Connected to MongoDB");
}).catch((err) => {
  console.error(" MongoDB connection failed:", err.message);
});



// GET all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
        { return res.status(404).json({ message: "Product not found" });}
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// POST create product
app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await Product.create({ name, price });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product by ID
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );
    if (!updated) {
        return res.status(404).json({ message: "Product not found" });}
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
        { return res.status(404).json({ message: "Product not found" });}
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
