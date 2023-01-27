import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Alert} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Select, CheckIcon, Radio, HStack, Button} from 'native-base';

const MAX_ROWS = 5;
const MAX_COLUMNS = 5;
const SLOTS = Array(MAX_ROWS)
  .fill(null)
  .map(() => new Array(MAX_COLUMNS).fill(null));
const ENTRANCE = [
  {name: 'A', row: 0, col: 2},
  {name: 'B', row: 0, col: 6},
  {name: 'C', row: MAX_ROWS, col: 3},
];

const Main = () => {
  const [service, setService] = useState('');
  const [value, setValue] = useState('S');
  const [parkingSlots, setParkingSlots] = useState(SLOTS);
  const [widthArr] = useState([40, 60, 80, 100, 120, 140, 160, 180, 200]);
  useEffect(() => {
    initSpaces();
    // getRandomSize();
    // return () => {};
  }, []);

  const initSpaces = () => {
    for (let i = 0; i < MAX_ROWS; i++) {
      for (let j = 0; j < MAX_COLUMNS; j++) {
        if (!isGateway(i, j)) {
          SLOTS[i][j] = {
            occupied: false,
            psize: getRandomSize(),
            row: i,
            col: j,
          };
        }
      }
    }
  };

  const park = (size, ent) => {
    let entrance = ENTRANCE.find((o) => o.name === ent.toUpperCase());
    let nrow = -1,
      ncol = -1;
    let distance = 9999;

    // Search for the nearest parking space
    for (let i = 0; i < MAX_ROWS; i++) {
      for (let j = 0; j < MAX_COLUMNS; j++) {
        if (!isGateway(i, j)) {
          let p = SLOTS[i][j];
          if (size <= p.psize.value) {
            // Check if vehicle fits in parking slot
            let computedDistance =
              Math.abs(entrance.row - p.row) + Math.abs(entrance.col - p.col);
            if (distance > computedDistance && !p.occupied) {
              distance = computedDistance;
              nrow = i;
              ncol = j;
            }
          }
        }
      }
    }

    if (nrow == -1) {
      // No parking slot found
      console.log("No parking slot found");
      return false;
    } else {
      Object.assign(SLOTS[nrow][ncol], {
        occupied: true,
        vsize: {
          value: parseInt(size),
          desc: getVehicleDesc(size),
        },
        row: nrow,
        col: ncol,
        start: new Date(),
      });

      return SLOTS[nrow][ncol];
    }
  };
  const getVehicleDesc = (size) => {
    switch (parseInt(size)) {
      case 0:
        return "S";
        break;
      case 1:
        return "M";
        break;
      case 2:
        return "L";
        break;
      default:
        return "";
    }
  };

  const getRandomSize = () => {
    // SP = 0, MP = 1, LP = 2
    const max = 2;
    const min = 0;
    const descriptors = ['SP', 'MP', 'LP'];
    const size = Math.round(Math.random() * (max - min) + min);
    const desc = descriptors[size];
    return {
      value: size,
      desc: desc,
    };
  };

  const isGateway = (row, col) => {
    if (
      col === 0 ||
      row === 0 ||
      row === MAX_ROWS - 1 ||
      col === MAX_COLUMNS - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const viewMap = () => {
    console.log(SLOTS);
  };

  return (
    <>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          {SLOTS.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row]}
              textStyle={styles.text}
            />
          ))}
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
        <Button
          borderRadius="full"
          colorScheme="success"
          onPress={() => park(1, 'A')}>
          PARK
        </Button>
        <Button
          borderRadius="full"
          colorScheme="success"
          onPress={() => viewMap()}>
          View MAP
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
  text: {margin: 6, color: 'red'},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});

export default Main;
