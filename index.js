const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const OAuthModel = require('./Auth/OauthModel');
const permit = require('./Auth/permission');
const data = require('./data/jsonData');
const userRouter = require('./routes/userRoutes');
const policyRouter = require('./routes/policyRoutes');

const { Request, Response } = OAuth2Server;
const app = express();
const port = process.env.PORT || '8000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = new OAuth2Server({
    model: OAuthModel,
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true,
});

const obtainToken = (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    return app.oauth.token(request, response)
        .then((token) => {
            res.json(token);
        }).catch((err) => {
            res.status(err.code || 500).json(err);
        });
};

const authenticateRequest = (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);

    return app.oauth.authenticate(request, response)
        // eslint-disable-next-line no-unused-vars
        .then((token) => {
            req.user = data.getUserByName(token.user.username);
            next();
        }).catch((err) => {
            res.status(err.code || 500).json(err);
        });
};

app.all('/oauth/token', obtainToken);
app.use('/users', authenticateRequest, permit('admin', 'user'), userRouter);
app.use('/policies', authenticateRequest, permit('owner', 'admin'), policyRouter);

// eslint-disable-next-line no-unused-vars
const jsonErrorHandler = async (err, req, res, next) => {
    let { statusCode } = err;
    if (typeof statusCode === 'undefined') {
        statusCode = 500;
    }
    res.status(statusCode).send({ error: { statusCode, message: err.message } });
};
app.use(jsonErrorHandler);

const server = app.listen(port, async () => {
    /* This is just to not get the json data on every request so the test run faster.
    If this were a real API then this initial fetch would be not needed */
    await data.initData();
    OAuthModel.config.users = data.accounts;
    console.log(`Listening to requests on http://localhost:${port}`); // eslint-disable-line no-console
});

module.exports = server;
