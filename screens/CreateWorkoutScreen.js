import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import uuid from 'uuid/v4';
import { FAB, IconButton } from 'react-native-paper';
import { set } from 'lodash';

import AppBar from '../components/AppBar';
import EditExercise from '../components/EditExercise';

export default class CreateWorkoutScreen extends React.Component {
	state = {
		exercises: [],
		sets: [],
		name: '',
	}
	addExcercise = () => {
		this.setState(({ exercises }) => ({
			exercises: [...exercises, {
				id: uuid(),
				sets: [],
			}],
		}));
	};

	handleWorkoutChange = (id, path, value) => {
		this.setState(({ exercises }) => ({
			exercises: exercises.map(val => (val.id === id ? set(val, path, value) : val)),
		}));
	};
	handleSetChange = (id, path, value) => {
		this.setState(({ sets }) => ({
			sets: sets.map(val => (val.id === id ? set(val, path, value) : val)),
		}));
	};
	addSet = (exerciseId) => {
		const id = uuid();
		this.setState(({ exercises, sets }) => ({
			exercises: exercises.map(val => (val.id === exerciseId ? set(val, 'sets', [...val.sets, id]) : val)),
			sets: [...sets, {
				id,
			}],
		}));
	};
	removeSet = (exerciseId, setId) => {
		this.setState(({ exercises, sets }) => ({
      exercises: exercises.map(val => (val.id === exerciseId) ? set(val, 'sets', val.sets.filter(val => val !== setId)) : val),
			sets: sets.filter(({ id }) => id !== setId),
		}));
	};
	removeExercise = exerciseId => {
		this.setState(({ exercises, sets }) => {
      const exerciseToRemove = exercises.find(({ id }) => id === exerciseId);
			return {
        exercises: exercises.filter(({ id }) => id !== exerciseId),
				sets: sets.filter(({ id }) => !exerciseToRemove.sets.includes(id)),
			};
		});
	};
	handleNameChange = name => {
		this.setState({
			name
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<AppBar title="Create Workout" goBack={() => this.props.navigation.goBack()}>
					<IconButton icon="save" />
				</AppBar>
				<TextInput label="Workout Name" value={this.state.name} onChangeText={this.handleNameChange} />
				<FlatList
					data={this.state.exercises}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) =>
						<EditExercise
							{...item}
							allSets={this.state.sets}
							onChange={this.handleWorkoutChange.bind(this, item.id)}
							onSetChange={this.handleSetChange}
							addSet={this.addSet.bind(this, item.id)}
							removeSet={this.removeSet.bind(this, item.id)}
							removeExercise={this.removeExercise.bind(this, item.id)}
						/>}
					ListEmptyComponent={() =>
						<Text>No Exercises Added, Press the Plus to Add One</Text>}
				/>
				<FAB
					style={styles.fab}
					icon="add"
					onPress={this.addExcercise}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
	container: {
		height: '100%',
	},
})
