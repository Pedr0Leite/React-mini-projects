import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      //We dont have to put the full url becase its mentioned on frontend package.json due to CORS
      const response = await fetch("/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json);
        dispatch({type: 'SET_WORKOUTS', payload: json});
      }
    };

    //Only fetch workouts if we have a user
    if(user){
      fetchWorkouts();
    }

  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((individualWorkout) => (
            <WorkoutDetails
              key={individualWorkout._id}
              workout={individualWorkout}
            />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
