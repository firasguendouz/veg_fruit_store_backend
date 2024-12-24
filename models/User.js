// models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  phoneNumber: { type: String, maxlength: 20 },
  address: { type: String, maxlength: 255 },
  wishlist: { type: Array }, // Array of product IDs or product details
  notifications: { type: Object }, // Notification preferences
  role: { type: String, default: 'client', enum: ['client', 'admin'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', UserSchema);

export default User;
