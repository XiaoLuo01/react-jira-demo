import { AuthSlice } from './auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import { ProjectListSlice } from 'pages/ProjectList/ProjectList.slice';

export const rootReducer = {
  projectList: ProjectListSlice.reducer,
  auth: AuthSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
