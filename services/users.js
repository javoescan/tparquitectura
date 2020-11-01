const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const users = require('../mocks/users.json');

class UsersService {
    getAll = () => {
        return users.id;
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
        fs.writeFileSync('mocks/users.json', JSON.stringify(users));
        return user;
    }
}

module.exports = new UsersService();
