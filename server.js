const fs = require("fs/promises");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(PORT, () => 
    console.log((`App listening at http://localhost:${PORT}`))
);