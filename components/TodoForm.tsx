import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';
import { Task } from '../types';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import TodoListItem from './TodoListItem';

export default function TodoForm ({ path, textTask, updateTextTask, saveTask }: { path: string, textTask: string, updateTextTask: any, saveTask: any }) {
  // const [textTask, setTextTask] = useState<string>('')
  // const dispatch = useDispatch()

  function handleSubmit(event: any) {
    event.preventDefault();
    saveTask();
  }
  
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={styles.inner}>
            <Text style={styles.header}>ToDo for day</Text>
            <TextInput
              placeholder="New task"
              style={styles.textInput}
              value={textTask}
              onChangeText={updateTextTask}
              onSubmitEditing={saveTask}
              importantForAutofill={'yes'}
            />
            <View style={styles.btnContainer}>
              <Button title="Add task" onPress={saveTask} />
            </View>
          </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
  textInput: {
    height: 20,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  }
});
