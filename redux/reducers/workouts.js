import { SAVE_WORKOUT } from '../actions';

const initial = {
};

export const workouts = (state = initial, action) => {
	switch (action.type) {
		case SAVE_WORKOUT: {
			const { payload } = action;
			return {
				...state,
				[payload.id]: {
          name: payload.name,
					exercises: payload.exercises.map(({ id }) => id),
					id: payload.id,
				},
			};
		}
    default:
			return state;
	}
};
