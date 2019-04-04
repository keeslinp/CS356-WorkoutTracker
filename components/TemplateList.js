import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';

const Workout = ({ workout: { name, id }, openWorkout, time, id: templateId }) => (
	<Card>
		<TouchableRipple
			onPress={() => openWorkout(id, templateId)}
		>
			<Card.Title
				title={name}
				left={(props) => <Avatar.Icon {...props} icon="fitness-center" />}
				subtitle="Press for more details"
			/>
		</TouchableRipple>
	</Card>
);

const TemplateList = ({ workouts, openWorkout }) => {
	return (
		<FlatList
			data={Object.values(workouts)}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <Workout {...item} openWorkout={openWorkout} />}
		/>
	);
};

export default TemplateList;
