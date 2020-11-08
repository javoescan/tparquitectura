const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const users = require("../mocks/users.json");

class UsersService {
  fields = ["email", "firstName", "lastName", "document", "role"];

  getAll = () => {
    return users;
  }

  get = id => {
    return users.find(user => user.id === id);
  }

  create = user => {
    const existing = users.find(pUser => pUser.email === user.email);
    if (existing) {
      return null;
    }
    user.id = uuidv4();
    users.push(user);
    fs.writeFileSync("mocks/users.json", JSON.stringify(users));
    return user;
  }

  update = user => {
    const userIndex = users.findIndex(pUser => pUser.id === user.id);
    if (userIndex === -1) {
      return null;
    }
    users[userIndex] = user;
    fs.writeFileSync("mocks/users.json", JSON.stringify(users));
    return user;
  }

  delete = id => {
    const userIndex = users.findIndex(pUser => pUser.id === id);
    if (userIndex === -1) {
      return null;
    }
    users.splice(userIndex, 1);
    fs.writeFileSync("mocks/users.json", JSON.stringify(users));
    return true;
  }
}

module.exports = new UsersService();
