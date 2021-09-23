import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import todayReducer from './slices/todaySlice';
import trackedDaysReducer from './slices/trackedDaysSlice'

export const store = configureStore({
  reducer: {
    today: todayReducer,
    trackedDays: trackedDaysReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;