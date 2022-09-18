const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const listItems = [];
const workItems = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { dayToday: day, listItems: listItems });
});

app.post("/", function (req, res) {
  const listItem = req.body.ListItem;
  if (req.body.list == "My Work") {
    workItems.push(listItem);
    res.redirect("/work");
  } else {
    listItems.push(listItem);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { dayToday: "My Work", listItems: workItems });
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server Running at port 3000\nGo to 127.0.0.1:3000");
});
