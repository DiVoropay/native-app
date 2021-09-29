import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, AppThunk, RootState } from '../store';

export type ITab = "TrackedDays" | "Today" | "Summary";
export type ITheme = 'dark' | 'light';

export interface IAppState {
  isLoading: boolean;
  currentTab?: ITab;
  autoTheme: boolean;
  theme: ITheme;
}

let initialState: IAppState = {
  isLoading: false,
  // currentTab: 'TrackedDays',
  autoTheme: true,
  theme: 'light',
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
    setAppIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppCurrentTab: (state, action: PayloadAction<ITab>) => {
      state.currentTab = action.payload;
    },
    setAppAutoTheme: (state, action: PayloadAction<boolean>) => {
      state.autoTheme = action.payload;
    },
    setAppTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
    setAppAllState: (state, action: PayloadAction<IAppState>) => {
      state.isLoading = action.payload.isLoading;
      state.currentTab = action.payload.currentTab;
      state.autoTheme = action.payload.autoTheme;
      state.theme = action.payload.theme;
    },
  }
})

export const {
  setAppIsLoading,
  setAppCurrentTab,
  setAppAutoTheme,
  setAppTheme,

  setAppAllState,
  
} = appSlice.actions;

export const getAppStorageState = (): AppThunk => async (
  dispatch,
) => {
  getStoreToday()
    .then(storageState => storageState && dispatch(setAppAllState(storageState)));
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