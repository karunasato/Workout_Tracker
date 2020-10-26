const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false });

app.get("/exercise", function(req,res){
    res.sendFile(path.join(__dirname, "public/exercise.html"))
})

app.get("/stats", function(req,res){
    res.sendFile(path.join(__dirname, "public/stats.html"))
})

app.get('/api/workouts', function(req,res){
    db.find().then(data=> {
        res.json(data)
    })
})
app.get('/api/workouts/range', function(req,res){
    db.find().then(data=> {
        res.json(data)
    })
})

app.put("/api/workouts/:id", function(req,res){
    console.log(req.body)
    console.log(req.params.id);
    //do something with db look up the document iwth the id, and update it.
    db.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}})
    .then(data=> res.json(data))
    .catch(err => console.log(err))
})

app.post("/api/workouts", function(req,res){
    //do something with db look up the document iwth the id, and update it.
   db.create(req.body)
    .then(data=> res.json(data))
    .catch(err => console.log(err))
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});