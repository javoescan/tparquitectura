const express = require('express');
const router = express.Router();

const usersService = require('../services/users');

router.get('/', (req, res) => {
  const users = usersService.getAll();
  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = usersService.get(req.params.id);
  user ? 
    res.send(user)
    : res.status(404).send("User not found");
});

router.post('', (req, res) => {
  if (!req.body || !req.body.email || !req.body.firstName || !req.body.lastName || !req.body.document || !req.body.role) {
    res.status(400).send("Params not defined");
    return;
  }
  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    document: req.body.document,
    role: req.body.role,
  };
  const created = usersService.create(user);
  created ? res.send(created) : res.status(400).send("User already exists");
});

module.exports = router;