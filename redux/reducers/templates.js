import { SAVE_TEMPLATE } from '../actions';

const initial = {
};

export const templates = (state = initial, action) => {
	switch (action.type) {
		case SAVE_TEMPLATE: {
			const { payload } = action;
			return {
				...state,
				[payload.id]: {
					id: payload.id,
					workoutId: payload.workoutId,
				},
			};
		}
    default:
			return state;
	}
};

