const express = require("express");
const app = express();
const notes = require("./notes");
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});