const userModel = require('../models/userModel');

module.exports = {

    getUsers: (req, res) => {
        const users = userModel.getUsers(req.query);
        res.status(200).send(users);
    },

    getUser: (req, res) => {
        const user = userModel.getUser(req.params.id);
        res.status(200).send(user);
    },

};
