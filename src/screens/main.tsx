import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const MAX_ROWS = 5;
const MAX_COLUMNS = 5;
const SLOTS = Array(MAX_ROWS)
  .fill(0)
  .map(row => new Array(MAX_COLUMNS).fill(''));
const ENTRANCE = [
  {name: 'A', row: 0, col: 2},
  {name: 'B', row: 0, col: 6},
  {name: 'C', row: MAX_ROWS, col: 3},
];

const Main = () => {
  useEffect(() => {
    return () => {};
  }, []);

  console.log('ENTRANCE', ENTRANCE);

  return (
    <>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Rows data={SLOTS} textStyle={styles.text} />
        </Table>
        <Button
          title="Park"
          onPress={() => Alert.alert(`${JSON.stringify(ENTRANCE)}`)}
          color="#007AFF"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  text: {margin: 6},
});

export default Main;
