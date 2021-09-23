import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import TodoListItem from '../components/TodoListItem';
import { selectTrackedDays } from '../store/slices/trackedDaysSlice';
import { RootTabScreenProps } from '../types';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';

export default function TrackedDaysScreen({ navigation }: RootTabScreenProps<'TrackedDays'>) {
  const { days } = useSelector(selectTrackedDays)

  return (
    <View style={styles.container}>

      <View style={styles.list}>
        {Object.keys(days).length
          ? <FlatList
              data={Object.values(days)}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) =>
                <>
                  <Text style={styles.title}>
                    Date: {new Date(item.date).toISOString().slice(0,10)}
                  </Text>
                  <Text>
                    Time: {secondsToDigitalClock(item.totalTime)}
                  </Text>
                  <View style={styles.list}>
                    {Object.keys(item.tasks).length
                      ? <FlatList
                          data={Object.values(item.tasks)}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => 
                            <TodoListItem task={item} updateTask={()=>{}} />
                          }
                        />
                      : <Text>No tasks for today</Text>
                    }
                  </View>
                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                </>
              }
            />
          : <Text>No tasks for today</Text>
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
  },
});
