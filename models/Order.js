// models/Order.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  recipientName: { type: String, required: true, maxlength: 100 },
  recipientAddress: { type: String, required: true, maxlength: 255 },
  recipientPhone: { type: String, maxlength: 20 },
  productList: { type: Array, required: true }, // Array of product objects (id, sku, name, quantity, price)
  totalAmount: { type: Number, default: 0.0 },
  paymentMethod: { type: String, default: 'unpaid', enum: ['unpaid', 'credit_card', 'cash', 'online'] },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'completed', 'failed'] },
  orderStatus: { type: String, default: 'processing', enum: ['processing', 'shipped', 'delivered', 'cancelled'] },
  deliveryType: { type: String, default: 'delivery', enum: ['delivery', 'pickup'] },
  clientId: { type: String }, // Linked to User ID
  guestId: { type: String }, // For guest users
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
