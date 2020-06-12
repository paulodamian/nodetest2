let userModel = require('../models/userModel');

module.exports = {

    getUser: (req, res) => {
        const user = userModel.getUser(req.params.id);
        res.status(200).send(user);
    }

}