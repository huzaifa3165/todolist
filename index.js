const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/todo");
const todoSchema = new mongoose.Schema({
  note: String,
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const Notes = new mongoose.model("note", todoSchema);
  Notes.find(function (err, list) {
    res.render("list", { dayToday: "today", listItems: list });
  });
});

app.post("/", function (req, res) {
  const Notes = new mongoose.model("note", todoSchema);
  const listItem = req.body.ListItem;
    const note = new Notes({
      note: listItem,
    });
    note.save();
    res.redirect("/");

});
app.post("/delete", function (req, res) {
  let id = req.body.checkbox;
  let page = req.body.pagetitle;
  if(page == "today"){
    const Notes = new mongoose.model('note', todoSchema);
    Notes.findByIdAndRemove(id,function(err){
      if(err){
        console.log(err)
      }
    });
    res.redirect("/");
  }
  else{
  const Notes = new mongoose.model(page, todoSchema);
  Notes.findByIdAndRemove(id,function(err){
    if(err){
      console.log(err)
    }
  });
  res.redirect("/"+page);
}
  

});

app.post("/:todopage", function (req,res){
    if(req.params.todopage=="today"){
      res.redirect(307, '/')
    }
    else{


    const listItem = req.body.ListItem;
    const Notes = new mongoose.model(req.params.todopage, todoSchema);
    const note = new Notes({
      note: listItem,
    });
    note.save();
    res.redirect("/"+req.params.todopage);
    }
  })

app.get("/:todopage", function (req, res) {
  const Notes = new mongoose.model(req.params.todopage, todoSchema);
  Notes.find(function (err, list) {
    res.render("list", { dayToday: req.params.todopage, listItems: list });
  });
});


app.listen(3000, function () {
  console.log("Server Running at port 3000\nGo to 127.0.0.1:3000");
});
