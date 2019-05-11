const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Supplier, validate } = require('../models/supplier');

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let supplier = await Supplier.findOne({name: req.body.name});
  if (supplier) return res.status(400).send('Supplier with the same name is already exists');

  supplier = new Supplier(req.body);

  await supplier.save();

  res.send(`${req.body.name} is added`);
});

module.exports = router;