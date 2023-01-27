import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Main from './screens/main';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
