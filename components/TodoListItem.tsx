import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { ITask } from '../store/slices/todaySlice';
import { MonoText } from './StyledText';
import { Text, View, Checkbox, FontAwesome, TextInput } from './Themed';

interface TodoListItemProps { 
  task: ITask,
  updateTask: any,
  editTask?: any,
  disabled?: boolean,
  editingTask?: ITask,
  isEditing?: boolean
}

export default function TodoListItem ({ task, updateTask, editTask, editingTask, isEditing, disabled }: TodoListItemProps ) {

  function handleCheckComplete(): void {
    updateTask({...task, isCompleted: !task.isCompleted})
  }

  function handleEditText(text: string): void {
    editTask({...editingTask, text: text})
  }

  function handleEditCheck(text: string): void {
    editTask({...editingTask, isCompleted: !task.isCompleted})
  }

  return (
    <View style={styles.taskContainer}>
      {isEditing
        ? <View style={styles.task}>
           <Checkbox onPress={handleEditCheck} status={task.isCompleted ? 'checked' : 'unchecked'}/>
           <TextInput style={styles.textInput} value={editingTask?.text} onChangeText={handleEditText}/>
          </View>
        : <TouchableOpacity style={styles.task}  onPress={handleCheckComplete} disabled={disabled}>
            <Checkbox onPress={handleCheckComplete} status={task.isCompleted ? 'checked' : 'unchecked'} color={disabled ? '#666' : undefined} />
            <Text style={ [styles.text,  task.isCompleted ? styles.completed : {}]}>{task.text}</Text>
          </TouchableOpacity>
      }
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
    justifyContent: 'flex-start',
    marginRight: 5,
  },
  text: {
    marginLeft: 10,
    color: '#2cf',
  },
  textInput: {
    borderRadius: 4,
    padding: 3,
    width: '80%',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  deleteContainer: {
    padding: 6,
  }
});
