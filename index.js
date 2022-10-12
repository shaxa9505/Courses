require('dotenv').config();
const express = require("express");
const app = express();

const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    console.log("Bosh sahifa");
    res.status(200).send("Home page");
})

app.get("/about", (req, res) => {
    res.status(200).send("About page");
})

app.all("*", (req, res) => {
    res.status(404).send("<h2>Kechirasiz bunday sahifa topilmadi</h2>");
})

app.listen(port, () => {
    console.log(`Serverimiz http://localhost:${port} portda ishga tushdi`);
})