import Checkbox from 'expo-checkbox';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function TodoListItem ({ task, updateTask }: { task: Task, updateTask: any }, ) {

  function handleChange(): void {
    updateTask({...task, isCompleted: !task.isCompleted})
  }

  return (
    <TouchableOpacity style={styles.task}>
      <Checkbox value={task.isCompleted} onChange={handleChange} />
      <Text style={ [styles.text,  task.isCompleted ? styles.completed : {}]}>{task.text}</Text>
    </TouchableOpacity>   
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: '#2cf',
    margin: 5,
  },
  text: {
    marginLeft: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  }
});
