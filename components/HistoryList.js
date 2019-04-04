import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';

const formatDate = date => {
  const obj = new Date(date);
  return obj.toLocaleDateString();
};

const Workout = ({ workout: { name, id }, openWorkout, time }) => (
	<Card>
		<TouchableRipple
			onPress={() => openWorkout(id)}
		>
			<Card.Title
				title={name}
				left={(props) => <Avatar.Icon {...props} icon="access-time" />}
				subtitle="Press for more details"
				right={() => <View style={styles.date}>
  				<Text>{formatDate(time)}</Text>
				</View>}
			/>
		</TouchableRipple>
	</Card>
);

const styles = StyleSheet.create({
  date: {
    marginRight: 10,
  },
});

const HistoryList = ({ workouts, openWorkout }) => {
	return (
		<FlatList
			data={Object.values(workouts).sort((a, b) => a.time < b.time)}
			keyExtractor={({ id }) => id}
			renderItem={({ item }) => <Workout {...item} openWorkout={openWorkout} />}
		/>
	);
};

export default HistoryList;
