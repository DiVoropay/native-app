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

const initialState: ITrackedDaysState = {
  days: {}
}

export const trackedDaysSlice = createSlice({
  name: 'trackedDays',
  initialState,
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

export const selectTrackedDays = (state: RootState) => state.trackedDays;

export default trackedDaysSlice.reducer