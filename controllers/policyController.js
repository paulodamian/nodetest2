const data = require('../data/jsonData');

module.exports = {

    getPolicies: (req, res) => {
        const policies = data.getPolicies(req.query);
        res.status(200).send(policies);
    },

};
