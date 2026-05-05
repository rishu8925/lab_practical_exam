const Product = require("../model/usermodel");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const updated = await Product.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(updated);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ message: "Product deleted successfully" });
});