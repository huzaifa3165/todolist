const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();
const workItems = [];


mongoose.connect("mongodb://localhost:27017/todo")
const todoSchema = new mongoose.Schema({
  note: String
})
const Notes = new mongoose.model("note",todoSchema)
const workNotes = new mongoose.model("worknote",todoSchema)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  Notes.find(function(err,list){
    const listItems = []
    list.forEach(element => {
      listItems.push(element.note)
    });
    const day = date.getDate();
    res.render("list", { dayToday: day, listItems: listItems });
  })
});

app.post("/", function (req, res) {
  const listItem = req.body.ListItem;

if (req.body.list == "My Work") {
  const note = new workNotes({
    note:listItem
  })
  note.save()
  res.redirect("/work");
} else {
    const note = new Notes({
    note:listItem
  })
  note.save()
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  workNotes.find(function(err,list){
    const listItems = []
    list.forEach(element => {
      listItems.push(element.note)
    });
    res.render("list", { dayToday: "My Work", listItems: listItems });
  })
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server Running at port 3000\nGo to 127.0.0.1:3000");
});
