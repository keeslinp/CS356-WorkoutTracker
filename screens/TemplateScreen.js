import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';

import TemplateList from '../components/TemplateList';
import AppBar from '../components/AppBar';


class TemplateScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

	openWorkout = (id, templateId) => this.props.navigation.push('Workout', { id, templateId, });
	createWorkout = () => this.props.navigation.push('CreateWorkout');

  render() {
	  const { templates } = this.props;
    return (
	    <View style={styles.container}>
		    <AppBar title="Workout Templates" />
		    <TemplateList workouts={templates} openWorkout={this.openWorkout} />
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
});

const mapStateToProps = (state) => {
	const templates = Object.values(state.templates).map(({ workoutId, ...rest }) => ({
    ...rest,
    workout: state.workouts[workoutId],
	}));
	return {
		templates,
	};
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateScreen);
