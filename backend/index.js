console.log("This is index");

const express = require("express");
const app = express();
const mongoose = require("mongoose");



const User = require("./userModel");

insert();
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
