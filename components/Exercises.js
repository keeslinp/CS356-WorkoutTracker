import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, DataTable, List } from 'react-native-paper';

const Set  = ({ reps, weight, index }) => (
  <DataTable.Row>
    <DataTable.Cell numeric>{index + 1}</DataTable.Cell>
    <DataTable.Cell numeric>{reps}</DataTable.Cell>
    <DataTable.Cell numeric>{weight}</DataTable.Cell>
  </DataTable.Row>
);

const Exercise = ({ name, sets, setList }) => (
  <List.Accordion title={name}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numeric>Set #</DataTable.Title>
          <DataTable.Title numeric>Reps</DataTable.Title>
          <DataTable.Title numeric>Weight</DataTable.Title>
        </DataTable.Header>
        {sets.map((set, index) => <Set {...setList.find(({ id }) => id === set)} key={set} index={index} />)}
      </DataTable>
    </List.Accordion>
);

const Exercises = ({ exercises, sets }) => (
  <FlatList
    data={exercises}
    keyExtractor={({ id }) => id}
		renderItem={({ item }) => <Exercise {...item} setList={sets} />}
  />
);

export default Exercises;
