import { SAVE_WORKOUT } from '../actions';

const initial = {
};

export const exercises = (state = initial, action) => {
	switch (action.type) {
		case SAVE_WORKOUT: {
			const { payload } = action;
			const newExercises = payload.exercises.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
			return {
				...state,
				[payload.id]: newExercises,
			};
		}
		default:
			return state;
	};
};
