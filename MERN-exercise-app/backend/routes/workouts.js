const express = require('express');
const { createWorkout, getAllWorkouts, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//fire this middleware function, before all those below (to proctect all the routes)
//require auth for all workout routes
router.use(requireAuth);

//GET all workouts
router.get('/', getAllWorkouts);

//GET a single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', createWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);


module.exports = router;