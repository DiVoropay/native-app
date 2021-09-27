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
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // saving error
  }
}


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
    setAllTrackedDaysState: (state, action: PayloadAction<ITrackedDaysState>) => {
      state.days = action.payload.days;
    }
  }
})

export const {
  setTrackedDays,
  setAllTrackedDaysState,
} = trackedDaysSlice.actions;

export const getTrackedDaysStorageState = (): AppThunk => async (
  dispatch,
) => {
  getStoreTrackedDays()
    .then(storageState => dispatch(setAllTrackedDaysState(storageState)));
};

export const setTrackedDaysStorageState = (state: ITrackedDaysState): AppThunk => async (
  dispatch,
) => {
  storeTrackedDays(state);
};

export const selectTrackedDays = (state: RootState) => {
  return state.trackedDays;
}

export default trackedDaysSlice.reducer