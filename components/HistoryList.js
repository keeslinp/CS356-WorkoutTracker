import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';

const Workout = ({ workout: { name, id }, openWorkout, time }) => (
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

const HistoryList = ({ workouts, openWorkout }) => {
	return (
		<FlatList
			data={Object.values(workouts)}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <Workout {...item} openWorkout={openWorkout} />}
		/>
	);
};

export default HistoryList;