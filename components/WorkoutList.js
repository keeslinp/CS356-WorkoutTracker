import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';

const Workout = ({ name, id, openWorkout }) => (
	<Card>
		<TouchableRipple
			onPress={() => openWorkout(id)}
		>
			<Card.Title
				title={name}
				left={(props) => <Avatar.Icon {...props} icon="fitness-center" />}
				subtitle="Press for more details"
			/>
		</TouchableRipple>
	</Card>
);

const WorkoutList = ({ workouts, openWorkout }) => {
	return (
		<FlatList
			data={workouts}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <Workout {...item} openWorkout={openWorkout} />}
		/>
	);
};

export default WorkoutList;
