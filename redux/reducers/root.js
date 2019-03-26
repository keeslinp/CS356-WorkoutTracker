import {combineReducers} from 'redux';
import { exercises } from './exercises';
import { sets } from './sets';
import { workouts } from './workouts';

export default combineReducers({
  exercises,
	sets,
	workouts,
});
