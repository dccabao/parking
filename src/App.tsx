import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import Main from './screens/main';

const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Main />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
