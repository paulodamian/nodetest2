const express = require('express');
const data = require('./data/jsonData');

const app = express();
const port = process.env.PORT || '8000';

const userRouter = require('./routes/userRoutes');
const policyRouter = require('./routes/policyRoutes');

app.use('/users', userRouter);
app.use('/policies', policyRouter);

// eslint-disable-next-line no-unused-vars
const jsonErrorHandler = async (err, req, res, next) => {
    let { statusCode } = err;
    if (typeof statusCode === 'undefined') {
        statusCode = 500;
    }
    res.status(statusCode).send({ error: { statusCode, message: err.message } });
};
app.use(jsonErrorHandler);

app.listen(port, async () => {
    /* This is just to not get the json data on every request so the test run faster.
    If this were a real API then this initial fetch would be not needed */
    await data.initData();
    console.log(`Listening to requests on http://localhost:${port}`); // eslint-disable-line no-console
});
