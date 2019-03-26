import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, DataTable, List } from 'react-native-paper';

const Set  = ({ reps, weight, index }) => (
  <DataTable.Row>
    <DataTable.Cell numeric>{index}</DataTable.Cell>
    <DataTable.Cell numeric>{reps}</DataTable.Cell>
    <DataTable.Cell numeric>{weight}</DataTable.Cell>
  </DataTable.Row>
);

const Exercise = ({ name, sets }) => (
  <List.Accordion title={name}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Set #</DataTable.Title>
          <DataTable.Title numeric>Reps</DataTable.Title>
          <DataTable.Title numeric>Weight</DataTable.Title>
        </DataTable.Header>
        {sets.map((set, index) => <Set {...set} key={set.id} index={index} />)}
      </DataTable>
    </List.Accordion>
);

const Exercises = ({ exercises, sets }) => (
  <FlatList
    data={exercises}
    keyExtractor={({ id }) => id}
		renderItem={({ item }) => <Exercise {...item} sets={sets} />}
  />
);

export default Exercises;
