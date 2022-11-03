import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeLoad = (e) => setLoad(e.target.value);
  const onChangeReps = (e) => setReps(e.target.value);
  const onChangeDifficulty = (e) => setDifficulty(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps, difficulty };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setDifficulty("");
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'CREATE_WORKOUTS', payload: json});
      console.log("New workout added", json);
    }
  };

  const handleEmptyFields = (field) =>{
    return emptyFields.includes(field) ? 'error' : '';
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title: </label>
      <input 
        type="text" 
        onChange={onChangeTitle} 
        value={title} 
        className = {handleEmptyFields('title')}
        />

      <label>Load (in kg): </label>
      <input 
        type="number" 
        onChange={onChangeLoad} 
        value={load} 
        className = {handleEmptyFields('load')}
        />

      <label>Reps: </label>
      <input 
        type="number" 
        onChange={onChangeReps} 
        value={reps} 
        className = {handleEmptyFields('reps')}
        />

      <label>Difficulty: </label>
      <input
        type="number"
        onChange={onChangeDifficulty}
        value={difficulty}
        className = {handleEmptyFields('difficulty')}
        min="1"
        max="4"
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
