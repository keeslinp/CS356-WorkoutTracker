import { SAVE_WORKOUT } from '../actions';

const initial = {
	first: {
		id: 'first',
		name: 'Pull Ups',
		sets: [
			'first_set',
			'second_set',
		],
	},
	second: {
		id: 'second',
		name: 'Bicep Curls',
		sets: [
			'third_set',
			'fourth_set',
			'fifth_set',
		],
	},
	third: {
		id: 'third',
		name: 'Lat Pull Down',
		sets: [
			'6_set',
			'7_set',
		],
	},
};

export const exercises = (state = initial, action) => {
	switch (action.type) {
		case SAVE_WORKOUT: {
			const { payload } = action;
			const newExercises = payload.exercises.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
			return {
				...state,
				...newExercises,
			};
		}
		default:
			return state;
	};
};
