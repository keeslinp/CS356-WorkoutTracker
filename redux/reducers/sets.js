import { SAVE_WORKOUT } from '../actions';

const initial = {
};

export const sets = (state = initial, action) => {
	switch (action.type) {
		case SAVE_WORKOUT: {
			const { payload } = action;
			const newSets = payload.sets.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
			return {
				...state,
				[payload.id]: newSets,
			};
		}
		default:
			return state;
	};
};

