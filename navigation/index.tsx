import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import SummaryScreen from '../screens/SummaryScreen';
import TodayScreen from '../screens/TodayScreen';
import TrackedDaysScreen from '../screens/TrackedDaysScreen';
import { getAppStorageState, selectApp, setAppStorageState, setAppTheme } from '../store/slices/appSlice';
import { getTodayStorageState, selectToday, setTodayStorageState } from '../store/slices/todaySlice';
import { getTrackedDaysStorageState, selectTrackedDays, setTrackedDaysStorageState } from '../store/slices/trackedDaysSlice';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import secondsToDigitalClock from '../utils/secondsToDigitalClock';
import LinkingConfiguration from './LinkingConfiguration';
import SettingsScreen from '../screens/SettingsScreen';
import { StatusBar } from 'expo-status-bar';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch= useDispatch();

  const appState = useSelector(selectApp);
  const { autoTheme, theme } = appState;
  const todayState = useSelector(selectToday);
  const trackedDaysState = useSelector(selectTrackedDays);
 
  useEffect(() => {
    dispatch(getAppStorageState());
    dispatch(getTodayStorageState());
    dispatch(getTrackedDaysStorageState());
  },[]);

  useEffect(() => {
    dispatch(setAppStorageState(appState));
  },[appState]);
  
  useEffect(() => {
    dispatch(setTodayStorageState(todayState));
  },[todayState]);

  useEffect(() => {
    dispatch(setTrackedDaysStorageState(trackedDaysState));
  },[trackedDaysState]);

  useEffect(() => {
    if (appState.autoTheme && colorScheme) {
      dispatch(setAppTheme(colorScheme))
    }
  },[colorScheme, autoTheme]);


  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark' } />
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
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="Settings" component={SettingsScreen}  />
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
  const { time } = useSelector(selectToday);
  const { currentTab, theme } = useSelector(selectApp);

  return (
    <BottomTab.Navigator
      initialRouteName={currentTab || "Today"}
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
      }}
    >
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={({ navigation }: RootTabScreenProps<'Today'>) => ({
          title: 'Today',
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="sliders"
                size={25}
                color={Colors[theme].text}
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
