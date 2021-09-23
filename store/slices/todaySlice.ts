import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, AppThunk, RootState } from '../store';

export interface ITask {
  id: number;
  text: string;
  isCompleted: boolean; 
}

export interface ITodayState {
  currentCountTime: number;
  time: number;
  startTime: number;
  isStarting: boolean;
  isStoping: boolean;
  isPaused: boolean;
  timer: any;
  textTask: string;
  tasks: { id: ITask } | {};
}

const initialState: ITodayState = {
  currentCountTime: 0,
  time: 0,
  startTime: 0,
  isStarting: false,
  isStoping: false,
  isPaused: false,
  timer: 0,
  textTask: '',
  tasks: {},
}

export const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    setTodayIsStarting: (state, action: PayloadAction<boolean>) => {
      state.isStarting = action.payload;
    },
    setTodayIsStoping: (state, action: PayloadAction<boolean>) => {
        state.isStoping = action.payload;
    },
    setTodayIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setTodayStartTime: (state) => {
      state.startTime = Date.now();
    },
    setTodayTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setTodayCurrentCountTime: (state, action: PayloadAction<number>) => {
      state.currentCountTime = action.payload;
    },
    setTodayTextTask: (state, action: PayloadAction<string>) => {
      state.textTask = action.payload;
    },
    setTodayTasks: (state, action: PayloadAction<ITask>) => {
      const newTask = {
        [action.payload.id]: action.payload
      }
      state.tasks = { ...state.tasks, ...newTask };
    },
    setTodayTimer: (state, action: PayloadAction<any>) => {
      state.timer = action.payload
    },

    startTodayTimer: (state) => {
      state.isStarting = true;
      state.startTime = Date.now();
      state.isPaused = false;
    },
    stopTodayTimer: (state) => {
      if (state.isStarting) {
        state.time = state.currentCountTime + Math.floor((Date.now() - state.startTime)/1000);
      }
      state.isStarting = false;
      state.isStoping = true;
      state.isPaused = false;
      state.currentCountTime = 0;
      state.tasks = {};
    },
    pauseTodayTimer: (state) => {
      state.time = state.currentCountTime + Math.floor((Date.now() - state.startTime)/1000);
      state.currentCountTime = state.time;
      state.isStarting = false;
      state.isPaused = true;
    },
    updateTodayTime: (state) => {
      state.time = state.currentCountTime + Math.floor((Date.now() - state.startTime)/1000);;
    },
  }
})

export const {
  setTodayIsStarting,
  setTodayIsStoping,
  setTodayIsPaused,
  setTodayStartTime,
  setTodayTime,
  setTodayCurrentCountTime,
  setTodayTextTask,
  setTodayTasks,
  setTodayTimer,

  startTodayTimer,
  stopTodayTimer,
  pauseTodayTimer,
  updateTodayTime,
} = todaySlice.actions;

export const startTimerInterval = (data: any): AppThunk => async (
  dispatch,
) => {
  const newTimer = setInterval(() => dispatch(updateTodayTime()), 1000);
  dispatch(setTodayTimer(newTimer));
};

export const selectToday = (state: RootState) => state.today;

export default todaySlice.reducer