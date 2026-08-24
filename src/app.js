const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Messaging service is healthy",
  });
});

app.get("/about", (req , res) => {
    res.status(200).json({
        status: "This is about page",
        message: "This is about message page",
    });
});

module.exports = app;