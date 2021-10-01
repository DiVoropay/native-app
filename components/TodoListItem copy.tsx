import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View, Checkbox, FontAwesome } from './Themed';

export default function TodoListItem ({ task, updateTask, disabled }: { task: Task, updateTask: any, disabled?: boolean }, ) {
  const [isDialogActived, setIsDialogActived] = useState();

  function handleChange(): void {
    updateTask({...task, isCompleted: !task.isCompleted})
  }

  function handleDelete(): void {
    
  }

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={styles.task}  onPress={handleChange} disabled={disabled}>
        <Checkbox onPress={handleChange} status={task.isCompleted ? 'checked' : 'unchecked'} color={disabled ? '#666' : undefined} />
        <Text style={ [styles.text,  task.isCompleted ? styles.completed : {}]}>{task.text}</Text>    
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteContainer}  onPress={handleChange} disabled={disabled}>
        <FontAwesome name={'trash'} size={20} />
      </TouchableOpacity>

      <Modal
      visible={isDialogActived}>
        <TextInput />
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    width: '80%',
  },
  text: {
    marginLeft: 10,
    color: '#2cf',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  deleteContainer: {
    padding: 6,
  }
});
