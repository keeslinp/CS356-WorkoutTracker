import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { IconButton } from 'react-native-paper';
import Exercises from '../components/Exercises';
import AppBar from '../components/AppBar';

const WorkoutScreen = ({ navigation, workout, sets, exercises }) => {
	const id = navigation.getParam('id', null);
	if (!id) {
		return <Text>Missing</Text>;
	}
	return <View>
		<AppBar title={workout.name} goBack={() => navigation.goBack()}>
      <IconButton
				icon="content-copy"
			/>
    </AppBar>
		<Exercises exercises={exercises} sets={sets} />
	</View>
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.navigation.getParam('id', null);
	const workout = state.workouts[id];
	const exercises = workout.exercises.map(id => state.exercises[id]);
	const sets = exercises.map(exercise => exercise.sets).flat().map(id => state.sets[id]);
	return {
		workout,
		exercises,
		sets,
	};
}

export default connect(mapStateToProps)(WorkoutScreen);
