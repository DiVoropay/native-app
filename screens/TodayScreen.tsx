import React, {useEffect} from 'react';
import { Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import TodoForm from '../components/TodoForm';
import { RootTabScreenProps } from '../types';

import { selectToday, startTodayTimer, pauseTodayTimer, stopTodayTimer, setTodayTime, setTodayTimer, updateTodayTime, setTodayIsStoping, ITask, setTodayTextTask, setTodayTasks } from '../store/slices/todaySlice';
import TodoListItem from '../components/TodoListItem';
import { ITrackedDay, setTrackedDays } from '../store/slices/trackedDaysSlice';

import secondsToDigitalClock from '../utils/secondsToDigitalClock'

export default function TodayScreen({ navigation }: RootTabScreenProps<'Today'>) {
  const dispatch = useDispatch();
  const {
    currentCountTime,
    time,
    startTime,
    isStarting,
    isStoping,
    isPaused,
    textTask,
    tasks,
    timer,
  } = useSelector(selectToday);

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

  function handleInputTextTask(text: string):void {
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

  useEffect(() => {
    if (isStoping && time) {
      dispatch(setTodayTime(0));
      dispatch(setTodayIsStoping(false));      
    }
    
  },[ time, isStoping ]);

  useEffect(() => {
    isStarting ? updateTimer() : clearInterval(timer);
  },[ isStarting ]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.timer}>
        {secondsToDigitalClock(time)}
      </Text>
      <View style={styles.row}>
        <Button title="Start" onPress={startTimer} disabled={isStarting || isPaused} />
        <Button title={!isPaused ? 'Pause' : 'Continue'} onPress={pauseTimer} disabled={isStoping || (!isStarting && !isPaused)} />
        <Button title="Stop" onPress={stopTimer} disabled={isStoping || (!isStarting && !isPaused) } />
      </View>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
        <TodoForm
          path="ToDo will be here"
          textTask={textTask}
          updateTextTask={handleInputTextTask}
          saveTask={handleAddTask}
        />
        <View style={styles.list}>
          {Object.keys(tasks).length
              ? <FlatList
                  data={Object.values(tasks)}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => 
                    <TodoListItem task={item} updateTask={handleUpdateTask} />
                  }
                />
              : <Text>No tasks for today</Text>
          }
        </View>
      </View>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  timer: {
    width: 120,
    height: 60,
    fontSize: 30,
    fontWeight: 'bold',
  },
  list: {
    // flex: 2,
    // justifyContent: "flex-start",
    width: 300,
  },
});
