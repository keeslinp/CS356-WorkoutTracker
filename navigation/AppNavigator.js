import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import CreateWorkoutScreen from '../screens/CreateWorkoutScreen';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
	Main: HomeScreen,
	Workout: WorkoutScreen,
	CreateWorkout: CreateWorkoutScreen,
}, {
    headerMode: 'none',
	}));
