const mongoose = require('mongoose');
const joi = require('joi');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
    message: 'name is required',
  },
  country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  phone: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  email: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  notes: {
    type: String,
    minlength: 0,
    maxlength: 1000,
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

function validateSupplier (supplier) {
  const schema = {
    name: joi.string().min(1).max(200).required(),
    country: joi.string().min(1).max(200).required(),
    city: joi.string().min(1).max(200).required(),
    phone: joi.string().min(0).max(200).optional(),
    email: joi.string().email().min(0).max(200).optional(),
    notes: joi.string().min(0).max(1000).optional(),
  }

  return joi.validate(supplier, schema);
}

exports.supplierSchema = supplierSchema;
exports.Supplier = Supplier;
exports.validate = validateSupplier;