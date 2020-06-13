const express = require('express');
const policyController = require('../controllers/policyController');

const router = express.Router();

router.get('/', policyController.getPolicies);

module.exports = router;
