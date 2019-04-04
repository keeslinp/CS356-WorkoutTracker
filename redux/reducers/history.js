import { SAVE_HISTORY } from '../actions';

const initial = {
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


