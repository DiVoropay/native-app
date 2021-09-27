import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../constants/Colors';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { ITrackedDay } from '../store/slices/trackedDaysSlice';
import TodoListItem from './TodoListItem';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';
import { FontAwesome } from '@expo/vector-icons';

export default function DayItem({ day, updateDay }: { day: ITrackedDay, updateDay: any },) {

  const [editingDate, setEditingDate] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [editingDay, setEditingDay] = useState(false);

  function handleChangeDate(event: any, date: Date | undefined): void {
    date && updateDay({ ...day, date: date.getTime() })
    setEditingDate(false);
  }

  function handleChangeTime(event: any, date: Date | undefined): void {
    if (date) {
      const timeOfSeconds = date.getHours() * 60 * 60 + date.getMinutes() * 60;
      updateDay({ ...day, totalTime: timeOfSeconds })
    }
    setEditingTime(false);
  }

  return (
    <>
      {editingDate &&
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(day.date)}
          mode={'date'}
          is24Hour={true}
          display="calendar"
          onChange={handleChangeDate}
          maximumDate={new Date(day.id)}
        />
      }

      {editingTime &&
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(day.totalTime)}
          mode={'time'}
          is24Hour={true}
          display="spinner"
          onChange={handleChangeTime}
        />
      }
      <View style={styles.row}>
        <View>
          <Pressable disabled={!editingDay} onPress={() => setEditingDate(true)}>
            <Text style={[styles.title, , editingDay && styles.editing]}>
              Date: {new Date(day.date).toISOString().slice(0, 10)}
            </Text>
          </Pressable>
          <Pressable disabled={!editingDay} onPress={() => setEditingTime(true)}>
            <Text style={[styles.title, , editingDay && styles.editing]}>
              Time: {secondsToDigitalClock(day.totalTime)}
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => setEditingDay(!editingDay)}>
          <FontAwesome
                name="edit"
                size={20}
                color={'#2cf'}
                style={{ marginRight: 15 }}
              />
        </Pressable>
      </View>


      <View style={styles.list}>
        {Object.keys(day.tasks).length
          ? <FlatList
            data={Object.values(day.tasks)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
              <TodoListItem task={item} updateTask={() => { }} />
            }
          />
          : <Text style={styles.title}>No tasks for day</Text>
        }
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    margin: 5,
  },
  editing: {
    color: '#2cf',
    textDecorationLine: 'underline'
  },
  list: {
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
