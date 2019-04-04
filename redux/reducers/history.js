import { SAVE_HISTORY } from '../actions';

const initial = {
	history_1: {
		id: 'history_1',
		workoutId: 'workout_1',
    time: 1553790273562,
	},
};

export const history = (state = initial, action) => {
	switch (action.type) {
		case SAVE_HISTORY: {
			const { payload } = action;
			return {
				...state,
				[payload.id]: {
					id: payload.id,
					workoutId: payload.workoutId,
					time: payload.time,
				},
			};
		}
    default:
			return state;
	}
};


