import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import todayReducer from './slices/todaySlice';
import trackedDaysReducer from './slices/trackedDaysSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
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