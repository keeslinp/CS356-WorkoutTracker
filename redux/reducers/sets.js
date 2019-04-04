import { SAVE_WORKOUT } from '../actions';

const initial = {
	first_set: { id: 'first_set', reps: 20, weight: 10 },
	second_set: { id: 'second_set', reps: 10, weight: 10 },
	third_set: { id: 'third_set', reps: 8, weight: 40 },
	fourth_set: { id: 'fourth_set', reps: 8, weight: 40 },
	fifth_set: { id: 'fifth_set', reps: 6, weight: 40 },
	'6_set': { id: '6_set', reps: 20, weight: 10 },
	'7_set': { id: '7_set', reps: 10, weight: 10 },
};

export const sets = (state = initial, action) => {
	switch (action.type) {
		case SAVE_WORKOUT: {
			const { payload } = action;
			const newSets = payload.sets.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
			return {
				...state,
				...newSets,
			};
		}
		default:
			return state;
	};
};

