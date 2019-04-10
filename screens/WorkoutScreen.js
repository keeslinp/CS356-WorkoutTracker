import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { flattenDepth } from 'lodash';

import { IconButton } from 'react-native-paper';
import Exercises from '../components/Exercises';
import AppBar from '../components/AppBar';

const WorkoutScreen = ({ navigation, workout, sets, exercises, id }) => {
	const templateId = navigation.getParam('templateId', null);
	if (!id) {
		return <Text>Missing</Text>;
	}
	const playWorkout = () => {
		navigation.push('CreateWorkout', {
			id,
			templateId,
		});
	};
	const editWorkout = () => {
		navigation.push('CreateWorkout', {
			id,
			templateId,
			isEditing: true,
		});
	};

	const deleteWorkout = () => {
  	if (templateId) {
  	}
	};
	return <View>
		<AppBar title={workout.name} goBack={() => navigation.goBack()}>
			{templateId &&
  			[
  				<IconButton
            icon="play-circle-filled"
            onPress={playWorkout}
            key="play"
  				/>,
  				<IconButton
            icon="delete"
            key="delete"
            onPress={deleteWorkout}
  				/>
  			]
			}
      <IconButton
				icon="edit"
				onPress={editWorkout}
			/>
    </AppBar>
		<Exercises exercises={exercises} sets={sets} />
	</View>
};

const mapStateToProps = (state, ownProps) => {
  const templateId = ownProps.navigation.getParam('templateId', null);
  const id = templateId ? state.templates[templateId].workoutId : ownProps.navigation.getParam('id', null);
	const workout = state.workouts[id];
	const exercises = workout.exercises.map(exerciseId => state.exercises[id][exerciseId]);
	const sets = flattenDepth(exercises.map(exercise => exercise.sets)).map(setId => state.sets[id][setId]);
	return {
		workout,
		exercises,
		sets,
		id,
	};
};

export default connect(mapStateToProps)(WorkoutScreen);
