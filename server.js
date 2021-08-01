const fs = require("fs/promises");
const express = require("express");
const uuid = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/api/notes", async function (req, res) {
  try {
    const data = await fs.readFile("./db/db.json", "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).end("failed to reach /api/notes");
  }
});

app.post("/api/notes", async function (req, res) {
  try {
    const note = req.body;
    const data = await fs.readFile("./db/db.json", "utf8");
    const parsedData = JSON.parse(data);
    note.id = uuid.v1();
    parsedData.push(note);
    await fs.writeFile("db/db.json", JSON.stringify(parsedData));

    res.json(note);
  } catch (err) {
    res.status(500).end("failed to post note to /api/notes");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
