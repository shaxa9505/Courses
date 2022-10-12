const express = require("express");
const path = require("path")
const app = express();
require('dotenv').config();


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})


app.all("*", (req, res) => {
    res.status(404).send("Bunday sahifa topilmadi")
})


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`Serverimiz http://localhost:${port} portda ishga tushdi`);
})