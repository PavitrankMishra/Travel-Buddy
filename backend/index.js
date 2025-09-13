console.log("This is index");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://pavitrank2002_db_user:m5xkm8kRYggmSYZG@cluster0.7suw6vi.mongodb.net/"
);

const User = require("./userModel");

async function insert() {
  {
    await User.create({
      name: "Sandeep",
      email: "sandeep@gmail.com",
    });
  }
};

insert();
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
