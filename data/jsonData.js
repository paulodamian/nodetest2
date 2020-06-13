const axios = require('axios');
const _ = require('lodash');

const listFilter = (field, value, list) => {
    const matches = _.filter(list, (o) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!o.hasOwnProperty(field)) {
            return false;
        }
        return String(o[field]).toLowerCase() === value.toLowerCase();
    });

    return matches;
};

const throwError = (msg, statusCode) => {
    const err = new Error(msg);
    err.statusCode = statusCode;
    throw err;
};

const self = {
    policies: [],
    users: [],
    accounts: [],
    initData: async () => {
        try {
            const p = await axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5');
            const u = await axios.get('http://www.mocky.io/v2/5808862710000087232b75ac');
            self.policies = p.data.policies;
            self.users = u.data.clients;

            self.users.forEach((element) => {
                self.accounts.push({ username: element.name, password: element.email });
            });
        } catch (err) {
            throwError(err.message, 500);
        }
    },
    getUsers: (query) => {
        let { users } = self;

        for (const [key, value] of Object.entries(query)) {
            users = listFilter(key, value, users);
        }

        return users;
    },
    getUser: (userId) => {
        const user = _.find(self.users, { id: userId });

        if (typeof user === 'undefined') {
            throwError('User not found!', 404);
        }

        return user;
    },
    getUserByName: (userName) => {
        const user = _.find(self.users, { name: userName });

        if (typeof user === 'undefined') {
            throwError('User not found!', 404);
        }

        return user;
    },
    getPolicies: (query) => {
        let { policies } = self;

        for (const [key, value] of Object.entries(query)) {
            policies = listFilter(key, value, policies);
        }

        return policies;
    },
    getPolicy: (policyId) => _.find(self.policies, { id: policyId }),
    getAccounts: () => self.accounts,
};

module.exports = self;
