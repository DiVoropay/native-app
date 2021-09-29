import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View, Checkbox } from './Themed';

export default function TodoListItem ({ task, updateTask }: { task: Task, updateTask: any }, ) {

  function handleChange(): void {
    updateTask({...task, isCompleted: !task.isCompleted})
  }

  return (
    <TouchableOpacity style={styles.task}  onPress={handleChange}>
      <Checkbox status={task.isCompleted ? 'checked' : 'unchecked'} />
      <Text style={ [styles.text,  task.isCompleted ? styles.completed : {}]}>{task.text}</Text>
    </TouchableOpacity>   
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#2cf',
    marginTop: 15,
  },
  text: {
    marginLeft: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  }
});
