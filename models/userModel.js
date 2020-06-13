const data = require('../data/jsonData');

module.exports = {

    getUsers: (query) => data.getUsers(query),
    getUser: (id) => data.getUser(id),

};
