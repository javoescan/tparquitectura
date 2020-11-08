const express = require("express");
const validator = require("../helpers/validator");
const validateParams = validator.validateParams;
const router = express.Router();

const productsService = require("../services/products");

router.get("/", (req, res) => {
  const products = productsService.getAll();
  res.send(products);
});

router.get("/:id", (req, res) => {
  const product = productsService.get(req.params.id);
  product ? 
    res.send(product)
    : res.status(400).send("product not found");
});

router.post("", (req, res) => {
  if (!req.body || !validateParams(req.body, productsService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  const created = productsService.create(product);
  created ? res.send(created) : res.status(400).send("Product already exists");
});

router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body || !validateParams(req.body, productsService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };
  const updated = productsService.update(product);
  updated ? res.send(updated) : res.status(400).send("Bad request");
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Params not defined");
    return;
  }
  const deleted = productsService.delete(req.params.id);
  deleted ? res.send("Deleted") : res.status(400).send("Bad request");
});

module.exports = router;