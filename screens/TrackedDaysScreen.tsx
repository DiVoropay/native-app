import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, View } from '../components/Themed';
import TodoListItem from '../components/TodoListItem';
import { ITrackedDay, selectTrackedDays, setTrackedDays } from '../store/slices/trackedDaysSlice';
import { RootTabScreenProps } from '../types';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';
import DayItem from '../components/DayItem';
import { setAppCurrentTab } from '../store/slices/appSlice';

export default function TrackedDaysScreen({ navigation }: RootTabScreenProps<'TrackedDays'>) {
  const dispatch = useDispatch();

  const trackedDaysState = useSelector(selectTrackedDays)
  const { days } = trackedDaysState;

  const changeDay = (day: ITrackedDay) => {
    dispatch(setTrackedDays(day));
  }

  useEffect(() => {
    dispatch(setAppCurrentTab('TrackedDays'));
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {Object.keys(days).length
          ? <FlatList
              data={Object.values(days)}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) =>
                <DayItem day={item} updateDay={changeDay} />
              }
            />
          : <Text>No tracked days</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  list: {
    justifyContent: "flex-start",
    marginTop: 10,
    width: 360,
  },
});
