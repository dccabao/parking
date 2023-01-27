import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Select, CheckIcon, Radio, HStack, Button} from 'native-base';

const MAX_ROWS = 5;
const MAX_COLUMNS = 5;
const SLOTS = Array(MAX_ROWS)
  .fill(0)
  .map(row => new Array(MAX_COLUMNS).fill('x'));
const ENTRANCE = [
  {name: 'A', row: 0, col: 2},
  {name: 'B', row: 0, col: 6},
  {name: 'C', row: MAX_ROWS, col: 3},
];

const Main = () => {
  const [service, setService] = React.useState('');
  const [value, setValue] = React.useState('S');
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
        <HStack space={3}>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={nextValue => {
              setValue(nextValue);
            }}>
            <Radio value="S" my={1}>
              Small
            </Radio>
            <Radio value="M" my={1}>
              Medium
            </Radio>
            <Radio value="L" my={1}>
              Large
            </Radio>
          </Radio.Group>
          <Select
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Select Entry Point"
            placeholder="Select Entry Point"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="A" value="A" />
            <Select.Item label="B" value="B" />
            <Select.Item label="C" value="C" />
          </Select>
        </HStack>
        <Button borderRadius="full" colorScheme="success">
          PARK
        </Button>
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
