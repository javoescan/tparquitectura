const express = require("express");
const { validateParams, validatePatchParams } = require('../helpers/validator');
const router = express.Router();

const usersService = require("../services/users");

router.get("/", (req, res) => {
  const users = usersService.getAll();
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = usersService.get(req.params.id);
  user ? 
    res.send(user)
    : res.status(400).send("User not found");
});

router.get("/:id", (req, res) => {
  const user = usersService.get(req.params.id);
  user ? 
    res.send(user)
    : res.status(400).send("User not found");
});

router.post("", (req, res) => {
  if (!req.body || !validateParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  const created = usersService.create(user);
  created ? res.send(created) : res.status(400).send("User already exists");
});

router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body || !validateParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    id: req.params.id,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  const updated = usersService.update(user);
  updated ? res.send(updated) : res.status(400).send("Bad request");
});

router.patch("/:id", (req, res) => {
  if (!req.body || !validatePatchParams(req.body, usersService.fields)) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    id: req.params.id,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    document: req.body.document,
    role: req.body.role,
  };
  const patched = usersService.patch(user);
  patched ? res.send(patched) : res.status(400).send("Bad request");
});

router.delete("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Params not defined");
    return;
  }
  const deleted = usersService.delete(req.params.id);
  deleted ? res.send("Deleted") : res.status(400).send("Bad request");
});

module.exports = router;