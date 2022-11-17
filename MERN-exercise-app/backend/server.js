require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT;

//express app
const app = express();

//Middleware
//this adds the JSON, if exists, to the req when we use a POST/PATCH
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path} and Request Method: ${req.method}`);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //We are going to listen to requests only after we are connected to the DB
    //listen for requests
    app.listen(PORT, () => {
      console.log(`Connected to DB && listening on port ${PORT}`);
    });
  })
  .catch((dberror) => {
    console.log("DB Error: " + dberror);
  });
