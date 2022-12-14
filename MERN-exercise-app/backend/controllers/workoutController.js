const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no workout found!" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No workout found!" });
  }

  res.status(200).json(workout);
};

//POST a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps, difficulty } = req.body;

  let emptyFields = [];

  if(!title){
    emptyFields.push('title');
  }

  if(!load){
    emptyFields.push('load');
  }

  if(!reps){
    emptyFields.push('reps');
  }

  if(!difficulty){
    emptyFields.push('difficulty');
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all the fields!', emptyFields});
  }

  //add workout to db
  try {
    //user info comes from requireAuth
    const user_id = req.user._id;

    const workout = await Workout.create({ title, load, reps, difficulty, user_id });
    res.status(200).json(workout);

  } catch (postErr) {
    res.status(400).json({ error: postErr.message });
    console.log("Post Err: " + postErr);
  }
};

//PATCH update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no workout found!" });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No workout found!" });
  }

  res.status(200).json(workout);
};

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id, no workout found!" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No workout found!" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
