import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, FAB, IconButton } from 'react-native-paper';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'uuid/v4';
import { set, flattenDepth } from 'lodash';
import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import EditExercise from '../components/EditExercise';
import { saveWorkout, saveTemplate, saveHistory } from '../redux/actions';

class CreateWorkoutScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      exercises: props.exercises,
      sets: props.sets,
      name: props.name,
    };
	}
	getTemplateId = () => this.props.navigation.getParam('templateId', undefined);
	getId = () => this.props.navigation.getParam('id', undefined);
	isEditing = () => this.props.navigation.getParam('isEditing', false);
	isRunning = () => Boolean(this.getTemplateId()) && !this.isEditing();
	addExcercise = () => {
		const id = uuid();
		this.setState(({ exercises }) => ({
			exercises: [...exercises, {
				id,
				sets: [],
			}],
		}), () => this.addSet(id));
	};

	handleWorkoutChange = (id, path, value) => {
		this.setState(({ exercises }) => ({
			exercises: exercises.map(val => (val.id === id ? set(val, path, value) : val)),
		}));
	};
	handleSetChange = (id, path, value) => {
		this.setState(({ sets }) => ({
			sets: sets.map(val => {
  			if (val.id === id) {
    			console.log(id, path, value);
    			return Object.assign(set(val, path, value), { touched: true });
  			}
  			return val;
			}),
		}));
	};
	addSet = (exerciseId) => {
		const id = uuid();
		this.setState(({ exercises, sets }) => ({
			exercises: exercises.map(val => (val.id === exerciseId ? set(val, 'sets', [...val.sets, id]) : val)),
			sets: [...sets, {
				id,
				touched: true,
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
	handleSave = () => {
		const action = this.props.saveWorkout(this.state.exercises, this.state.sets, this.state.name);
		const templateId = this.getTemplateId();
		if (!templateId || this.isEditing()) {
			this.props.saveTemplate(action.payload.id, templateId);
		} else {
			this.props.saveHistory(action.payload.id);
		}
		this.props.navigation.goBack();
	};
  headerText = () => {
	  if (this.getId()) {
		  if (this.isEditing()) {
			  return 'Edit Workout';
		  }
      return 'Perform Workout';
	  }
	  return 'Create Workout';
	};
	render() {
		return (
			<View style={styles.container}>
				<AppBar title={this.headerText()} goBack={() => this.props.navigation.goBack()}>
					<IconButton icon="save" onPress={this.handleSave} />
				</AppBar>
				<TextInput label="Workout Name" value={this.state.name} onChangeText={this.handleNameChange} />
				<KeyboardAwareFlatList
					data={this.state.exercises}
					enableOnAndroid
					enableAutomaticScroll
          extraHeight={100}
					extraScrollHeight={100}
					keyboardOpeningTime={50}
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
							isRunning={this.isRunning()}
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

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.navigation.getParam('id', null);
	if (!id) {
		return {
      exercises: [],
			sets: [],
			name: '',
		};
	}
	const workout = state.workouts[id];
	const exercises = workout.exercises.map(exerciseId => state.exercises[exerciseId]);
	const sets = flattenDepth(exercises.map(({ sets }) => sets.map(setId => state.sets[setId])))
	  .map(({ reps, weight, ...rest}) => ({
  	  ...rest,
  	  reps: `${reps}`,
  	  weight: `${weight}`,
	  }));
	return {
		name: workout.name,
    exercises,
		sets,
	};
};
const mapDispatchToProps = dispatch => ({
	saveWorkout: (exercises, sets, name) => dispatch(saveWorkout(exercises, sets, name)),
	saveTemplate: (workoutId, templateId) => dispatch(saveTemplate(workoutId, templateId)),
	saveHistory: (workoutId) => dispatch(saveHistory(workoutId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkoutScreen);
