/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SummaryScreen from '../screens/SummaryScreen';
import TodayScreen from '../screens/TodayScreen';
import TrackedDaysScreen from '../screens/TrackedDaysScreen';
import { selectToday } from '../store/slices/todaySlice';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { time } = useSelector(selectToday);

  return (
    <BottomTab.Navigator
      initialRouteName="Today"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={({ navigation }: RootTabScreenProps<'Today'>) => ({
          title: 'Today',
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TrackedDays"
        component={TrackedDaysScreen}
        options={({ navigation }: RootTabScreenProps<'TrackedDays'>) => ({
          title: 'Tracked Days',
          tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Today')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Text style={{marginRight: 10, fontSize: 18, fontWeight: 'bold', color: '#2cf'}}>Today: {secondsToDigitalClock(time)}</Text>
            </Pressable>
          ),
        })}
      />
       <BottomTab.Screen
        name="Summary"
        component={SummaryScreen}
        options={({ navigation }: RootTabScreenProps<'Summary'>) => ({
          title: 'Summary',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Today')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Text style={{marginRight: 10, fontSize: 18, fontWeight: 'bold', color: '#2cf'}}>Today: {secondsToDigitalClock(time)}</Text>
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
