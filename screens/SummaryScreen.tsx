import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import TodoListItem from '../components/TodoListItem';
import { setAppCurrentTab } from '../store/slices/appSlice';
import { ITask } from '../store/slices/todaySlice';
import { ITrackedDay, selectTrackedDays } from '../store/slices/trackedDaysSlice';
import { RootTabScreenProps } from '../types';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';

interface SummaryDays {
  totalTime: 0;
  completedTasks: { id: ITask };
  uncompletedTasks: { id: ITask };
}

export default function SummaryScreen({ navigation }: RootTabScreenProps<'TrackedDays'>) {
  const dispatch = useDispatch();

  const { days } = useSelector(selectTrackedDays)
  const summaryData: SummaryDays = Object.values(days).reduce((summary: any, day: ITrackedDay) => {
    summary.totalTime += day.totalTime;
    Object.values(day.tasks).forEach(task =>
      task.isCompleted
        ? summary.completedTasks[task.id] = task
        : summary.uncompletedTasks[task.id] = task
    );

    return summary;

  }, { totalTime: 0, completedTasks: {}, uncompletedTasks: {} });


  React.useEffect(() => {
    dispatch(setAppCurrentTab('Summary'));
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Summary time of all days: {secondsToDigitalClock(summaryData.totalTime)}
      </Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.list}>
        {Object.keys(summaryData.completedTasks).length
          ? <FlatList
            data={Object.values(summaryData.completedTasks)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
              <TodoListItem task={item} updateTask={() => { }} />
            }
          />
          : <Text>No completed tasks</Text>
        }
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.list}>
        {Object.keys(summaryData.uncompletedTasks).length
          ? <FlatList
            data={Object.values(summaryData.uncompletedTasks)}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
              <TodoListItem task={item} updateTask={() => { }} />
            }
          />
          : <Text>No uncompleted tasks</Text>
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
    margin: 'auto',
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
    height: '40%',
  },
});
