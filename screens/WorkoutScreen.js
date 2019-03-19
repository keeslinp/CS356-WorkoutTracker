import React from 'react';
import { Text, View } from 'react-native';
import workouts from '../constants/Workouts';
import Exercises from '../components/Exercises';
import AppBar from '../components/AppBar';

const WorkoutScreen = ({ navigation }) => {
	const id = navigation.getParam('id', null);
	if (!id) {
		return <Text>Missing</Text>;
	}
	const workout = workouts.find(workout => id === workout.id);
	return <View>
		<AppBar title={workout.name} goBack={() => navigation.goBack()} />
		<Exercises exercises={workout.exercises} />
	</View>
};

export default WorkoutScreen;