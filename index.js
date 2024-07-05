const express = require("express");
const app = express();
let notes = require("./notes");
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    if (note) {
        res.json(note);
    }
    else {
        // res.statusMessage = "Note not found";
        // res.status(404).end();
        res.status(404).sendFile('./not-found.jpg', {root: __dirname});
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
})

app.use(express.json());

app.post('/api/notes', (req, res) => {
    // console.log(req.headers); // handy to catch errors
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;
    const note = req.body;
    note.id = String(maxId + 1);
    notes = notes.concat(note);
    res.json(note);
})

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
