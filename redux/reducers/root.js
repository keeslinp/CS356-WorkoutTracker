import {combineReducers} from 'redux';
import { exercises } from './exercises';
import { sets } from './sets';
import { workouts } from './workouts';
import { templates } from './templates';
import { history } from './history';

export default combineReducers({
  exercises,
	sets,
	workouts,
	templates,
	history,
});
