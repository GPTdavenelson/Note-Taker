var router = require('express').Router();

const fs = require('fs');
const path = require('path');

var data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));

router.get('/notes', function (req, res) {
    res.json(data);
});

router.get('/notes/:id', function (req, res) {
    res.json(data[Number(req.params.id)]);
});

router.post('/notes', function (req, res) {
    let newNote = req.body;
    let uniqueId = data.length.toString();
    console.log(uniqueId);
    newNote.id = uniqueId;
    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data), function (err) {
        if (err) throw err;
    });

    res.json(data);
});

router.delete('/notes/:id', function (req, res) {
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleted ${noteId}`);
    data = data.filter((currentNote) => {
        return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
});

module.exports = router;
