const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.set('port', port);

app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
})