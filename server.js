const fs = require("fs/promises");
const express = require("express");
const routes = require("")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

app.listen(PORT, () => 
    console.log((`App listening at http://localhost:${PORT}`))
);