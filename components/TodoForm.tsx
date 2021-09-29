import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import { ITask, ITasks } from '../store/slices/todaySlice';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View, TextInput, Autocomplete } from './Themed';
import TodoListItem from './TodoListItem';

interface ITodoFormProps {
  path: string,
  textTask: string,
  updateTextTask: any,
  saveTask: any,
  listTasks: ITasks;
  children?: any;
}

export default function TodoForm({ path, textTask, updateTextTask, saveTask, listTasks, children }: ITodoFormProps) {
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View style={styles.inner}>
          <Text style={styles.header}>ToDo for day</Text>
          <View style={styles.inner}>
            <View style={styles.autocompleteContainer}>
              <Autocomplete
                style={styles.autocomplete}
                data={textTask && Object.keys(listTasks) ? Object.values(listTasks) : []}
                value={textTask}
                placeholder={'New task'}
                onChangeText={updateTextTask}
                onSubmitEditing={saveTask}
                keyboardShouldPersistTaps = 'always'
                flatListProps={{
                  keyExtractor: (item, id) => item ? item.id.toString() : id,
                  renderItem: ({ item }) =>
                    <TouchableOpacity onPress={() => updateTextTask(item.text)}>
                      <View style={styles.row}>
                        <Text>
                          {item.text}
                        </Text>
                        <Text style={item.isCompleted ? styles.listItemCompleted : styles.listItemUncompleted}>
                          {item.isCompleted ? 'do it again' : 'finish up'}
                        </Text>
                      </View>
                    </TouchableOpacity>,
                }}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button title="Add task" onPress={saveTask} disabled={!textTask} />
            </View>
            {children}
          </View>

        </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inner: {
    padding: 10,
    //flex: 1,
    justifyContent: "flex-start",
    width: 300,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  autocomplete: {
    height: 30,
    padding: 5,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 35,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  listItemCompleted: {
    marginLeft: 7,
    color: '#5c5',
  },
  listItemUncompleted: {
    marginLeft: 7,
    color: '#c55',
  }
});
