import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from '../store';
import { ITask } from './todaySlice';


export interface ITrackedDay {
  id: number;
  date: number;
  totalTime: number;
  tasks: { id: ITask } | {};
}

export interface ITrackedDaysState {
  days: { id: ITrackedDay } | {}
}

let initialState: ITrackedDaysState = {
  days: {}
}

const storeTrackedDays = async (value: ITrackedDaysState) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('state-tracked-days', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getStoreTrackedDays = async () => {
  try {
    const jsonValue: string | null = await AsyncStorage.getItem('state-tracked-days')
    if (jsonValue != null) {
      initialState = JSON.parse(jsonValue);
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // saving error
  }
}


//const localTrackedDaysState: ITrackedDaysState = JSON.parse(AsyncStorage.getItem('state-tracked-days') || 'null');

export const trackedDaysSlice = createSlice({
  name: 'trackedDays',
  initialState: initialState,
  reducers: {
    setTrackedDays: (state, action: PayloadAction<ITrackedDay>) => {
      const newDay = {
        [action.payload.id]: action.payload
      }
      state.days = { ...state.days, ...newDay }
    },
  }
})

export const {
  setTrackedDays,
} = trackedDaysSlice.actions;

export const selectTrackedDays = (state: RootState) => {
  
  //AsyncStorage.setItem('state-tracked-days', JSON.stringify(state.trackedDays));
  storeTrackedDays(state.trackedDays);
  return state.trackedDays;
}

export default trackedDaysSlice.reducer