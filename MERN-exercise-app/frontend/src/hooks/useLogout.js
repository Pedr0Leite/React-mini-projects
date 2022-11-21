import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch a logout action
        dispatch({type: 'LOGOUT'});

        //dispatch the workouts from user that is logout
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return { logout };
}