// models/Admin.js

import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  role: { type: String, default: 'superadmin', enum: ['superadmin', 'moderator'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

AdminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
