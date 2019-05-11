const mongoose = require('mongoose');
const joi = require('joi');
const { supplierSchema } = require('./supplier');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
    message: 'Name is required',
  },
  suppliers: {
    type: Array,
  },
  type: {
    type: String,
    minlength: 0,
    maxlength: 200,
    message: 'Type is not valid'
  },
  material: {
    type: String,
    minlength: 0,
    maxlength: 200,
    message: 'Material is not valid'
  },
  quantity: {
    type: Number,
    minlength: 0,
    maxlength: 100000,
    message: 'Quantity is not valid'
  },
  notes: {
    type: String,
    minlength: 0,
    maxlength: 1000,
    message: 'Notes is not valid'
  }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct (product) {
  const schema = {
    name: joi.string().min(1).max(200).required(),
    supplierIds: joi.array().required(),
    type: joi.string().optional().min(0).max(200),
    material: joi.string().optional().min(0).max(200),
    quantity: joi.number().min(0).max(100000),
    notes: joi.string().optional().min(0).max(1000),
  }

  return joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;