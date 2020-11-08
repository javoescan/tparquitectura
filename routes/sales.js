const express = require("express");
const validator = require("../helpers/validator");
const validateParams = validator.validateParams;
const validateCollectionParams = validator.validateCollectionParams;
const router = express.Router();

const salesService = require("../services/sales");

router.get("/", (req, res) => {
  const sales = salesService.getAll();
  res.send(sales);
});

router.get("/:id", (req, res) => {
  const sale = salesService.get(req.params.id);
  sale ? 
    res.send(sale)
    : res.status(400).send("Sale not found");
});

router.post("", (req, res) => {
  if (!req.body || !validateParams(req.body, salesService.fields) || !validateCollectionParams(req.body.products, salesService.productFields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const sale = {
    products: req.body.products,
    userId: req.body.userId,
    date: req.body.date,
    totalPrice: req.body.totalPrice,
  };
  const created = salesService.create(sale);
  created.sale ? res.send(created.sale) : res.status(400).send(created.message);
});

router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body || !validateParams(req.body, salesService.fields) || !validateCollectionParams(req.body.products, salesService.productFields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const sale = {
    id: req.params.id,
    products: req.body.products,
    userId: req.body.userId,
    date: req.body.date,
    totalPrice: req.body.totalPrice,
  };
  const updated = salesService.update(sale);
  updated ?
    updated.sale ? res.send(updated.sale) : res.status(400).send(updated.message)
    : res.status(400).send("Sale doesn't exist");
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Params not defined");
    return;
  }
  const deleted = salesService.delete(req.params.id);
  deleted ? res.send("Deleted") : res.status(400).send("Bad request");
});

module.exports = router;