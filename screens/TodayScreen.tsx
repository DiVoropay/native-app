import React, { useEffect } from 'react';
import { Alert, Button, FlatList, ImageBackground, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesome, Text, View } from '../components/Themed';
import TodoForm from '../components/TodoForm';
import { RootTabScreenProps } from '../types';

import {
  selectToday,
  startTodayTimer,
  pauseTodayTimer,
  stopTodayTimer,
  setTodayTime,
  setTodayTimer,
  updateTodayTime,
  setTodayIsStoping,
  ITask,
  setTodayTextTask,
  setTodayTasks,
  ITasks,
  setTodayInputTasksList,
  setEditingTask,
  setTodayDeleteTask,
} from '../store/slices/todaySlice';
import TodoListItem from '../components/TodoListItem';
import { ITrackedDay, selectTrackedDays, setTrackedDays } from '../store/slices/trackedDaysSlice';

import secondsToDigitalClock from '../utils/secondsToDigitalClock'
import { selectApp, setAppCurrentTab } from '../store/slices/appSlice';
import Snackbar from 'react-native-snackbar';

export default function TodayScreen({ navigation }: RootTabScreenProps<'Today'>) {
  const dispatch = useDispatch();

  const { theme } = useSelector(selectApp);
  const todayState = useSelector(selectToday);
  const {
    currentCountTime,
    time,
    startTime,
    isStarting,
    isStoping,
    isPaused,
    textTask,
    tasks,
    inputTasksList,
    timer,
    editingTask,
  } = todayState;

  const { days } = useSelector(selectTrackedDays);

  function updateTimer() {
    const newTimer = setInterval(() => dispatch(updateTodayTime()), 1000);
    dispatch(setTodayTimer(newTimer));
  }

  function startTimer() {
    dispatch(startTodayTimer())
  }

  function stopTimer() {
    const completedDay: ITrackedDay = {
      id: startTime,
      date: startTime,
      totalTime: time,
      tasks: tasks,
    }
    dispatch(setTrackedDays(completedDay))
    dispatch(stopTodayTimer())
  }

  function pauseTimer() {
    if (isPaused) {
      dispatch(startTodayTimer())
    } else {
      dispatch(pauseTodayTimer())
    }
  }

  function handleInputTextTask(text: string): void {
    dispatch(setTodayTextTask(text));
  }

  function handleAddTask() {
    const task: ITask = {
      id: Date.now(),
      text: textTask,
      isCompleted: false
    }

    dispatch(setTodayTasks(task));
    dispatch(setTodayTextTask(''));
  }

  function handleUpdateTask(task: ITask) {
    dispatch(setTodayTasks(task));
  }

  function handleEditTask(task: ITask | undefined) {
    dispatch(setEditingTask(task));
  }

  function handleSaveChanges() {
    editingTask && dispatch(setTodayTasks(editingTask));
    dispatch(setEditingTask(undefined));
  }

  function handleDeleteTask() {
    dispatch(setTodayDeleteTask(editingTask?.id));
    dispatch(setEditingTask(undefined));


  }

  function handleCloseModal() {
    handleEditTask(undefined);
  }

  useEffect(() => {
    const summaryTasks: ITasks = Object.values(days).reduce((summary: any, day: ITrackedDay) => {
      Object.values(day.tasks).forEach(task => {
        if (
          task.text.toLowerCase() !== textTask.toLowerCase()
          && task.text.toLowerCase().includes(textTask.toLowerCase())
        ) {
          summary[task.id] = task;
        }
      }
      );
      return { ...summary }
    }, {});
    dispatch(setTodayInputTasksList(summaryTasks))
  }, [textTask])

  useEffect(() => {
    if (isStoping && time) {
      dispatch(setTodayTime(0));
      dispatch(setTodayIsStoping(false));
    }
  }, [time, isStoping]);

  useEffect(() => {
    isStarting ? updateTimer() : clearInterval(timer);
  }, [isStarting]);

  useEffect(() => {
    dispatch(setAppCurrentTab('Today'));
  }, [])


  return (
    <ImageBackground source={{ uri: 'https://websailors.pro/wp-content/uploads/2021/04/ws-back-img-main.png' }} style={{ height: '100%', width: '100%', backgroundColor: 'none' }}>
      <View style={[styles.container, theme === 'light' ? styles.containerLight : {}]}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.timer}>
          {secondsToDigitalClock(time)}
        </Text>
        <View style={styles.row}>
          <Button title="Start" onPress={startTimer} disabled={isStarting || isPaused} />
          <Button title={!isPaused ? 'Pause' : 'Continue'} onPress={pauseTimer} disabled={isStoping || (!isStarting && !isPaused)} />
          <Button title="Stop" onPress={stopTimer} disabled={isStoping || (!isStarting && !isPaused)} />
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TodoForm
          path="ToDo will be here"
          textTask={textTask}
          updateTextTask={handleInputTextTask}
          saveTask={handleAddTask}
          listTasks={inputTasksList}
        >
          <View style={styles.list}>
            {Object.keys(tasks).length
              ? <FlatList
                data={Object.values(tasks)}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                  <View style={styles.rowContainer}>
                    <TodoListItem task={item} updateTask={handleUpdateTask} editTask={handleEditTask} />
                    <TouchableOpacity style={styles.deleteContainer} onPress={()=>handleEditTask(item)}>
                      <FontAwesome name={'edit'} size={20} />
                    </TouchableOpacity>
                  </View>
                }
              />
              : <Text style={styles.lineText}>No tasks for today</Text>
            }
          </View>
        </TodoForm>
      </View>
      <Modal
        style={editingTask && styles.modal}
        visible={!!editingTask}
        animationType='slide'
        transparent={true}
        onRequestClose={handleCloseModal}>
          {!!editingTask &&
            <View style={styles.centeredView}>
              <Text style={styles.title}>Edit task</Text>
              {editingTask
                ? <TodoListItem task={editingTask} editingTask={editingTask} updateTask={handleUpdateTask} editTask={handleEditTask} isEditing={true} />
                : <Text style={styles.lineText}>No find task</Text>
              }
              <TouchableOpacity onPress={handleSaveChanges}>
                <Text style={[styles.lineText, styles.saveText]}>Save changes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteTask}>
                <Text style={[styles.lineText, styles.deleteText]}>Delete task</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.lineText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          }
        
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerLight: {
    backgroundColor: 'transparent',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    left: '15%',
    right: '15%',
    opacity: .9,
    borderWidth: 0,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '15%',
    bottom: '15%',
    left: '15%',
    right: '15%',
    opacity: .9,
    borderRadius: 10,
    shadowRadius: 5,
    shadowColor: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 240,
    backgroundColor: 'transparent',
  },
  rowContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  timer: {
    width: 120,
    height: 60,
    fontSize: 30,
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: 'transparent',
    height: '55%',
    shadowRadius: -30,
    shadowColor: '#d2f',
  },
  lineText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#933',
  },
  saveText: {
    color: '#2cf',
  },
  deleteContainer: {
    padding: 6,
  }
});
