const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
let courses = require("./courses.json");
const fs = require("fs");
const { v4 } = require("uuid");

app.set("view engine", "ejs"); // berga qanaqa shablonizatordan foydalanekkanimizni yozamiz 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))




// HOME PAGE
app.get("/", (req, res) => {
    res.render("index", {title: "Bosh Sahifa", active: "home"})
})

// ABOUT PAGE
app.get("/about", (req, res) => {
    res.render("about", {title: "Biz haqimizda", active: "about"})
})

// COURSES PAGE
app.get("/courses", (req, res) => {
    res.render("courses", {title: "Kurslar", active: "courses", courses: courses})
})

// ADD COURSE PAGE
app.get("/addCourse", (req, res) => {
    res.render("addCourse", {title: "Kurs qo'shish", active: "addCourse"});
})


// ADD NEW COURSE
app.post("/addCourse", (req, res) => {
    const { title, term, teacher, select } = req.body;
    console.log(title, term, teacher, select);
    const newCourse = {
        id: v4(),
        title: title,
        term: term,
        teacher: teacher
    }
    courses.push(newCourse);

    fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
        if(err) throw err;
        else console.log("Qushildi");
    })

    res.redirect("/courses");
})

// EDIT COURSE method=GET
app.get("/editCourse/:id", (req, res) => {
    const id = req.params.id
    const editCourse = courses.filter(item => item.id == id);
    res.render("edit", {title: "Kursni o'zgartirish", active: "editCourse", editCourse: editCourse});
})

// EDIT COURSE method=POST
app.post("/updateCourse/:id", (req, res) => {
    const id = req.params.id;
    // console.log(typeof(+id));
    const idx = courses.findIndex(item => item.id == id)
    const { title, term, teacher } = req.body;
    // console.log(idx);

    const updateCourse = {
        id: courses[idx].id,
        title: title,
        term: term,
        teacher: teacher
    }

    // console.log(updateCourse);

    courses[idx] = updateCourse;

    fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
        if(err) throw err;
        else console.log("Ma'lumotlaringiz muvaffaqiyatli uzgartirildi");
    });

    res.redirect("/courses")

})

// DELETE COURSE
app.get("/deleteCourse/:id", (req, res) => {
    const id = req.params.id;

    // console.log(typeof(+id));

    courses = courses.filter(item => item.id != id);
    // console.log(courses);

    fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
        if(err) throw err;
        else console.log("Ma'lumotlaringiz muvaffaqiyatli o'chirildi");
    });

    res.redirect("/courses")
})

app.get("/bio/:id", (req, res) => {
    const id = req.params.id;
    const bioCourse = courses.filter(item => item.id == id);
    res.render("bio", {title: "Batafsil", bioCourse: bioCourse, active: "bio"})
})

// ERROR PAGE
app.all("*", (req, res) => {
    res.status(404).send("Bunday sahifa topilmadi");
})


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`Serverimiz http://localhost:${port} portda ishga tushdi`);
})