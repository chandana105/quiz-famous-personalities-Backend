const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect.js");
const { errorHandler } = require("./middlewares/error-handler.middleware.js");
const {
  routeNotFound,
} = require("./middlewares/route-not-found.middleware.js");

const app = express();
app.use(bodyParser.json());

// Configure CORS to allow requests from your frontend's origin
app.use(cors({
  origin: 'https://quizzy-personalities.netlify.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies and other credentials
}));

// Handle preflight requests
app.options('*', cors({
  origin: 'https://quizzy-personalities.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

initializeDBConnection();

const insertIntoDB = require("./api/insertIntoDB.router.js");
const quizzes = require("./api/quizData.router.js");
const leaderBoard = require("./api/leaderBoard.router.js");

app.get("/", (req, res) => {
  res.send("Welcome to Quiz on Famous Personalities");
});

app.use("/insert", insertIntoDB);
app.use("/quiz", quizzes);
app.use("/leaderBoard", leaderBoard);

app.use(routeNotFound);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("server started at port", PORT);
});
