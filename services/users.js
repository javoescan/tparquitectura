const users = require('../mocks/users.json');

class UsersService {
    getAll = () => {
        return users.id;
    }

    get = id => {
        return users.find(user => user.id === id);
    }
}

module.exports = new UsersService();
