import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Card, TextInput, IconButton, Text } from 'react-native-paper';

const EditSet = ({ reps, weight, onChange, removeSet, id }) => (
	<View style={styles.valueRow}>
		<TextInput
			value={reps}
			onChangeText={(value) => onChange(id, 'reps', value)}
			keyboardType="numeric"
			style={styles.valueField}
			label="Reps"
			mode="outlined"
		/>
		<TextInput
			value={weight}
			onChangeText={(value) => onChange(id, 'weight', value)}
			keyboardType="numeric"
			style={styles.valueField}
			label="Weight"
			mode="outlined"
		/>
    <IconButton
			icon="delete"
      onPress={() => removeSet(id)}
		/>
	</View>
);

const EditExercise = ({ onChange, sets, allSets, name, onSetChange, addSet, removeSet }) => (
	<Card style={styles.card}>
		<Card.Content>
			<TextInput label="Name" value={name} onChangeText={(value) => onChange('name', value)} />
			<FlatList
				data={sets}
				keyExtractor={(id) => id}
				renderItem={({ item }) =>
					<EditSet
						{...allSets.find(({ id }) => id === item)}
						onChange={onSetChange}
						removeSet={removeSet}
					/>}
				ListEmptyComponent={() => <Text>No sets, add one</Text>}
			/>
			<Card.Actions style={styles.iconContainer}>
				<IconButton
					icon="add"
					onPress={addSet}
				/>
			</Card.Actions>
		</Card.Content>
	</Card>
);

const styles = StyleSheet.create({
	valueRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	valueField: {
		width: 100,
    marginLeft: 20,
		marginRight: 20,
	},
	iconContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
	},
	card: {
		margin: 10,
	}
});

export default EditExercise;
