require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// proxy is used instead of using localhost directly. proxy value is specified in package.json of the react app
const app = express();

// process.env.USE_CLOUD_SERVER is provided via config vars from Heroku
let useCloudServer = process.env.USE_CLOUD_SERVER || false;
console.log("useCloudServer = ", useCloudServer);

let port =process.env.PORT || 5000;
let uri;
if (useCloudServer) {
    uri = process.env.ATLAS_URI;
}
else {
    uri = "mongodb://127.0.0.1";
}

// process.env.MONGODB_URI is provided via config vars from Heroku
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
});

// Add the Routes Below
const assetRouter = require('./routes/assets');
const transactionRouter = require('./routes/transactions');
const todoRouter = require('./routes/todos');
const userRouter = require('./routes/users');

app.use(bodyParser.json());
app.use('/api/assets', assetRouter);
app.use('/api/transactions/', transactionRouter);
app.use('/api/todos/', todoRouter);
app.use('/api/users/',userRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.listen(port, () => {
    console.log(`Server is now running on ${port}`);
});