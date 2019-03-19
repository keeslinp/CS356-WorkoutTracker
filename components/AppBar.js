import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo'

const AppBar = ({ goBack, title, children }) => (
  <Appbar.Header>
    {goBack &&
        <Appbar.BackAction
          onPress={goBack}
        />
    }
    <Appbar.Content
      title={title}
    />
    {children}
  </Appbar.Header>
);

export default AppBar;
