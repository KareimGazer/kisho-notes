const express = require("express");
const app = express();
let notes = require("./notes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());

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

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;
    return String(maxId + 1);
}

app.post('/api/notes', (req, res) => {
    // console.log(req.headers); // handy to catch errors
    const note = req.body;
    if (!note.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }
    note.id = generateId();
    note.important = Boolean(note.important) || false;
    notes = notes.concat(note);
    res.json(note);
})

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
