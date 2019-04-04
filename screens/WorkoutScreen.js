import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { flattenDepth } from 'lodash';

import { IconButton } from 'react-native-paper';
import Exercises from '../components/Exercises';
import AppBar from '../components/AppBar';

const WorkoutScreen = ({ navigation, workout, sets, exercises }) => {
	const id = navigation.getParam('id', null);
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
	return <View>
		<AppBar title={workout.name} goBack={() => navigation.goBack()}>
			{templateId &&
				<IconButton
          icon="play-circle-filled"
          onPress={playWorkout}
				/>
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
	const id = ownProps.navigation.getParam('id', null);
	const workout = state.workouts[id];
	const exercises = workout.exercises.map(id => state.exercises[id]);
	const sets = flattenDepth(exercises.map(exercise => exercise.sets)).map(id => state.sets[id]);
	return {
		workout,
		exercises,
		sets,
	};
}

export default connect(mapStateToProps)(WorkoutScreen);
