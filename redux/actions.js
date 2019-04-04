import uuid from 'uuid/v4';

export const SAVE_WORKOUT = 'SAVE_WORKOUT';
export const SAVE_TEMPLATE = 'SAVE_TEMPLATE';
export const SAVE_HISTORY = 'SAVE_HISTORY';

export const saveWorkout = (exercises, sets, name, id) => ({
  type: SAVE_WORKOUT,
	payload: {
		exercises,
		sets,
		id: id || uuid(),
		name,
	},
});

export const saveTemplate = (workoutId, templateId = uuid()) => ({
	type: SAVE_TEMPLATE,
	payload: {
		id: templateId,
		workoutId,
	},
});


export const saveHistory = (workoutId) => ({
	type: SAVE_HISTORY,
	payload: {
		id: uuid(),
		workoutId: workoutId,
		time: Date.now(),
	},
});
