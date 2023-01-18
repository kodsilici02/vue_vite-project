const express = require("express");
const { connectToDb, getDb } = require("./connection");
const app = express();
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("listening 3000");
    });
    db = getDb();
  }
});

app.get("/books", (req, res) => {
  res.json({ mssg: "aaa" });
});
