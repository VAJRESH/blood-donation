const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// .env file import which is used to store confidential data like mongodb database password
require('dotenv').config();

// typical express server set up with basic functionality to listen to requests and respond to it

const app = express();
const port = process.env.PORT || 5000;

app.set('port', port);

const uri = process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connection successful');
});


app.use(cors());
app.use(express.json());

const donor = require('./routes/crud_actions');
app.use('/donor', donor);

// this is to serve the react app to the browser.
const publicPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});