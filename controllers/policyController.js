const policyModel = require('../models/policyModel');

module.exports = {

    getPolicies: (req, res) => {
        const policies = policyModel.getPolicies(req.query);
        res.status(200).send(policies);
    },

};
