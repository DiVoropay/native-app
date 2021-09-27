import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, AppThunk, RootState } from '../store';

export type ITab = "TrackedDays" | "Today" | "Summary";

export interface IAppState {
  isLoading: boolean;
  currentTab?: ITab;
  theme: string;
}

let initialState: IAppState = {
  isLoading: false,
  // currentTab: 'TrackedDays',
  theme: '',
}

const storeToday = async (value: IAppState) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('state-app', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getStoreToday = async () => {
  try {
    const jsonValue: string | null = await AsyncStorage.getItem('state-app')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // saving error
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentTab: (state, action: PayloadAction<ITab>) => {
      state.currentTab = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setAllAppState: (state, action: PayloadAction<IAppState>) => {
      state.isLoading = action.payload.isLoading;
      state.currentTab = action.payload.currentTab;
      state.theme = action.payload.theme;
    },
  }
})

export const {
  setIsLoading,
  setCurrentTab,
  setTheme,

  setAllAppState,
  
} = appSlice.actions;

export const getAppStorageState = (): AppThunk => async (
  dispatch,
) => {
  getStoreToday()
    .then(storageState => dispatch(setAllAppState(storageState)));
};

export const setAppStorageState = (state: IAppState): AppThunk => async (
  dispatch,
) => {
  storeToday(state);
};

export const selectApp = (state: RootState) => {
  return state.app;
}

export default appSlice.reducer