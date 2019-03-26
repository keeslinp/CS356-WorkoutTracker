import uuid from 'uuid/v4';

export const SAVE_WORKOUT = 'SAVE_WORKOUT';

export const saveWorkout = (exercises, sets, name) => ({
  type: SAVE_WORKOUT,
	payload: {
		exercises,
		sets,
		id: uuid(),
		name,
	},
});
