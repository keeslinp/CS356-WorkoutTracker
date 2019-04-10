import React from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import { Card, IconButton, Text, Button, Checkbox, TextInput as PaperInput } from 'react-native-paper';

const EditSet = ({ reps, weight, onChange, removeSet, id, touched, completed, isRunning }) => (
	<View style={styles.valueRow}>
	  {isRunning && <Checkbox
  	  status={completed ? 'checked' : 'unchecked'}
			onPress={() => onChange(id, 'completed', !completed)}
	  />}
  	<View style={styles.valueContainer}>
  		<TextInput
  			placeholder={reps ? reps : 'Reps'}
  			value={touched ? reps : ''}
  			onChangeText={(value) => onChange(id, 'reps', value)}
  			keyboardType="numeric"
  			style={styles.valueField}
  		/>
		</View>
  	<View style={styles.valueContainer}>
  		<TextInput
  			placeholder={weight ? weight : 'Weight'}
  			value={touched ? weight : ''}
  			onChangeText={(value) => onChange(id, 'weight', value)}
  			keyboardType="numeric"
  			style={styles.valueField}
  		/>
		</View>
		<Text>lb</Text>
		<IconButton
			icon="delete"
			onPress={() => removeSet(id)}
		/>
	</View>
);

const EditExercise = ({ onChange, sets, allSets, name, onSetChange, addSet, removeSet, removeExercise, isRunning }) => (
	<Card style={styles.card}>
		<Card.Content>
			<View style={styles.nameField}>
				<PaperInput
					label="Exercise Name"
					value={name}
					onChangeText={(value) => onChange('name', value)}
					style={styles.nameTextField}
				/>
				<IconButton
					icon="delete"
					onPress={removeExercise}
				/>
			</View>
			<FlatList
				data={sets}
				keyExtractor={(id) => id}
				renderItem={({ item }) =>
					<EditSet
						{...allSets.find(({ id }) => id === item)}
						onChange={onSetChange}
						removeSet={removeSet}
						isRunning={isRunning}
					/>}
				ListEmptyComponent={() => <Text>No sets, add one</Text>}
				ListFooterComponent={() => <Button icon="add" onPress={addSet}>Add Set</Button>}
			/>
		</Card.Content>
	</Card>
);

const styles = StyleSheet.create({
	valueRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 5,
		marginRight: 20,
	},
	valueField: {
		width: 80,
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
	},
	nameField: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	nameTextField: {
		minWidth: '90%',
	},
	valueContainer: {
  	borderWidth: 1,
  	borderRadius: 4,
  	marginLeft: 5,
  	marginRight: 5,
	},
});

export default EditExercise;
