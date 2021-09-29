import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { selectApp, setAppAutoTheme, setAppTheme } from '../store/slices/appSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function SettingsScreen({navigation}: any) {
  const dispatch = useDispatch();
  const { autoTheme, theme } = useSelector(selectApp);

  function handleToggleAutoThemeSwitch() {
    dispatch(setAppAutoTheme(!autoTheme))
  };

  function handleToggleThemeSwitch(value: boolean) {
    dispatch(setAppTheme(value ? 'light' : 'dark'))
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.row}>
        <Text style={styles.subtitle}>Auto theme: </Text>
        <Text style={[styles.text, !autoTheme && styles.active ]}>manual</Text>
        <Switch style={styles.switch}
          trackColor={{ false: "#767577", true: "#3df" }}
          thumbColor={autoTheme ? "#2cf" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleAutoThemeSwitch}
          value={autoTheme}
        />
        <Text style={[styles.text, autoTheme && styles.active ]}>auto</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.subtitle, autoTheme && styles.disabled]}>Theme: </Text>
        <Text
          style={[ styles.text, theme === 'dark' && styles.active, autoTheme && styles.disabled ]}
        >
          dark
        </Text>
        <Switch style={styles.switch}
          trackColor={{ false: "#767577", true: "#3df" }}
          thumbColor={theme === 'light' ? "#2cf" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleThemeSwitch}
          value={theme === 'light'}
          disabled={autoTheme}
        />
        <Text
          style={[ styles.text, theme === 'light' && styles.active, autoTheme && styles.disabled ]}
        >
          light
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonWithIcon} onPress={() => navigation.goBack()}>
        <FontAwesome name='arrow-left' />
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 240,
  },
  buttonWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    color: '#aaa'
  },
  active: {
    color: '#2cf',
    fontWeight: 'bold',
  },
  switch: {
    marginLeft: 6,
    marginRight: 6,
  },
  disabled: {
    color: '#aaa'
  },
});
