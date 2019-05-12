const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Fawn = require('fawn');
const { Supplier, validate } = require('../models/supplier');
const { Product } = require('../models/product');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let supplier = await Supplier.findOne({name: req.body.name});
  if (supplier) return res.status(400).send('Supplier with the same name is already exists');

  supplier = new Supplier(req.body);

  await supplier.save();

  res.send(`${req.body.name} is added`);
});

router.delete('/:id', async (req, res) => {
  const supplier = await Supplier.findByIdAndDelete(req.params.id)

  if (!supplier) return res.status(400).send('Cannot find a supplier that you want to delete');

  // find product that has the same supplier id and update product and delete the supplier id
  const products = await Product
    .find({ suppliers: { $elemMatch: {_id: ObjectId(req.params.id)} }})
    .updateMany({ $pull: { suppliers: { _id: ObjectId(req.params.id) } }})
});

module.exports = router;