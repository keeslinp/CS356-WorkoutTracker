import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import HistoryList from '../components/HistoryList';
import AppBar from '../components/AppBar';


class HistoryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

	openWorkout = (id) => this.props.navigation.push('Workout', { id });

  render() {
	  const { history } = this.props;
    return (
	    <View style={styles.container}>
		    <AppBar title="Past Workouts" />
		    <HistoryList workouts={history} openWorkout={this.openWorkout} />
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
});

const mapStateToProps = (state) => {
	const history = Object.values(state.history).map(({ workoutId, ...rest }) => ({
    ...rest,
    workout: state.workouts[workoutId],
	}));
	return {
		history,
	};
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
