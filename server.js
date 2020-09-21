const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require(path.join(__dirname, 'routes', 'api')));

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log(`serever started on http://localhost:${PORT}`));
