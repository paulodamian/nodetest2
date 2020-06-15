const data = require('../data/jsonData');

module.exports = {

    getUsers: (req, res) => {
        const users = data.getUsers(req.query);
        res.status(200).send(users);
    },

    getUser: (req, res) => {
        const user = data.getUser(req.params.id);
        res.status(200).send(user);
    },

};
