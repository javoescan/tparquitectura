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
    : res.status(404).send("User not found")
});

module.exports = router;