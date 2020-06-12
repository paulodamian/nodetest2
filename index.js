const express = require("express");
const path = require("path");

let data = require("./data/jsonData");

const app = express();
const port = process.env.PORT || "8000";

const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

app.listen(port, async () => {
    /* This is just to not get the json data on every request so the test run faster.
    If this were a real API then this initial fetch would be not needed */
    await data.initData();
    console.log(`Listening to requests on http://localhost:${port}`);
});