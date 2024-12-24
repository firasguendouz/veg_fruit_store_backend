// models/Product.js

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, maxlength: 100 },
  name: { type: String, required: true, maxlength: 100 },
  category: { type: String, required: true, maxlength: 50 },
  quantity: { type: Number, default: 0 },
  unitPrice: { type: Number, default: 0.0 },
  pricePer100g: { type: Number }, // Optional, for items sold by weight
  status: { type: String, default: 'active', enum: ['active', 'blocked'] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
