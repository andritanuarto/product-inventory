const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Product, validate } = require('../models/product');
const { Supplier } = require('../models/supplier');

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const supplier = await Supplier.findById(req.body.supplierId)
  if (!supplier) return res.status(400).send('The supplier id is not in the database');

  let product = await Product.findOne({name: req.body.name});
  if (product) return res.status(400).send('Product with the same name is already exists');

  product = new Product({
    name: req.body.name,
    supplier: {
      _id: supplier._id,
      name: supplier.name,
      country: supplier.country,
      city: supplier.city,
      phone: supplier.phone,
      email: supplier.email,
      notes: supplier.notes,
    },
    type: req.body.type,
    material: req.body.material,
    quantity: req.body.quantity,
    notes: req.body.notes,
  });

  await product.save();

  res.send(`${req.body.name} is added`);
});

router.get('/', async(req, res) => {
  let product = await Product.find().sort('name');
  res.send(product);
});

router.put('/:id', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    type: req.body.type,
    supplier: req.body.type,
    material: req.body.material,
    quantity: req.body.quantity,
    notes: req.body.notes,
  }, { new: true });

  if (!product) return res.status(400).send('Cannot find a product that you are looking for');

  res.send(`${req.body.name} with this id: ${req.params.id} has been updated`);
});

router.delete('/:id', async(req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) return res.status(400).send('Cannot find a product that you want to delete');

  res.send(`Product is deleted`);
});

router.get('/:id', async(req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(400).send('Cannot find a product that you want to delete');

  res.send(product);
});

module.exports = router;