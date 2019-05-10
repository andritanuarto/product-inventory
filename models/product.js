const mongoose = require('mongoose');
const joi = require('joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
    message: 'name is required',
  },
  type: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  supplier: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  material: {
    type: String,
    minlength: 0,
    maxlength: 200,
  },
  quantity: {
    type: Number,
    minlength: 0,
    maxlength: 100000,
  },
  notes: {
    type: String,
    minlength: 0,
    maxlength: 1000,
  }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct (product) {
  const schema = {
    name: joi.string().min(1).max(200).required(),
    type: joi.string().optional().min(0).max(200),
    supplier: joi.string().optional().min(0).max(200),
    material: joi.string().optional().min(0).max(200),
    quantity: joi.number().min(0).max(100000),
    notes: joi.string().optional().min(0).max(1000),
  }

  return joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;