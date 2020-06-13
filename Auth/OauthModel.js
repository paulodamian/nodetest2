const data = require('../data/jsonData');

/* This is just to not get the json data on every request so the test run faster.
    If this were a real API then this initial fetch would be not needed */
const initData = async () => {
    await data.initData();
};

initData();

/**
 * Configuration.
 */

const config = {
    clients: [{
        id: 'application',
        clientId: 'application',
        clientSecret: 'secret',
        grants: [
            'password',
            'refresh_token',
        ],
        redirectUris: [],
    }],
    confidentialClients: [{
        clientId: 'confidentialApplication',
        clientSecret: 'topSecret',
        grants: [
            'password',
            'client_credentials',
        ],
        redirectUris: [],
    }],
    tokens: [],
    users: data.getAccounts(),
};

/*
 * Methods used by all grant types.
 */

const getAccessToken = (token) => {
    const tokens = config.tokens.filter((savedToken) => savedToken.accessToken === token);
    return tokens[0];
};

const getClient = (clientId, clientSecret) => {
    const clients = config.clients.filter((client) => {
        const condition = client.clientId === clientId && client.clientSecret === clientSecret;
        return condition;
    });
    const confidentialClients = config.confidentialClients.filter((client) => {
        const condition = client.clientId === clientId && client.clientSecret === clientSecret;
        return condition;
    });
    return clients[0] || confidentialClients[0];
};

const saveToken = (token, client, user) => {
    token.client = {
        id: client.clientId,
    };

    token.user = {
        username: user.username,
    };

    config.tokens.push(token);

    return token;
};

/*
 * Method used only by password grant type.
 */

const getUser = (username, password) => {
    const users = config.users.filter((user) => {
        const condition = user.username === username && user.password === password;
        return condition;
    });

    return users[0];
};

/*
 * Method used only by client_credentials grant type.
 */

const getUserFromClient = (client) => {
    const clients = config.confidentialClients.filter((savedClient) => {
        const condition = savedClient.clientId === client.clientId
            && savedClient.clientSecret === client.clientSecret;
        return condition;
    });

    return clients.length;
};

/*
 * Methods used only by refresh_token grant type.
 */

const getRefreshToken = (refreshToken) => {
    const tokens = config.tokens.filter((savedToken) => savedToken.refreshToken === refreshToken);
    if (!tokens.length) {
        return false;
    }

    return tokens[0];
};

const revokeToken = (token) => {
    config.tokens = config.tokens.filter((savedToken) => {
        const condition = savedToken.refreshToken !== token.refreshToken;
        return condition;
    });

    const revokedTokensFound = config.tokens.filter((savedToken) => {
        const condition = savedToken.refreshToken === token.refreshToken;
        return condition;
    });

    return !revokedTokensFound.length;
};

/**
 * Export model definition object.
 */

module.exports = {
    getAccessToken,
    getClient,
    saveToken,
    getUser,
    getUserFromClient,
    getRefreshToken,
    revokeToken,
};
