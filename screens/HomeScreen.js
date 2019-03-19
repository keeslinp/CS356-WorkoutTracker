import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper';

import WorkoutList from '../components/WorkoutList';
import workouts from '../constants/Workouts';
import AppBar from '../components/AppBar';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

	openWorkout = (id) => this.props.navigation.push('Workout', { id });
	createWorkout = () => this.props.navigation.push('CreateWorkout');

  render() {
    return (
	    <View style={styles.container}>
		    <AppBar title="Past Workouts" />
        <WorkoutList workouts={workouts} openWorkout={this.openWorkout} />
        <FAB
          style={styles.fab}
          icon="add"
			    onPress={this.createWorkout}
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
