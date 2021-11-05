import { RootState } from './index';
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'pages/ProjectList/SearchPanel';
import * as auth from 'auth-provider';
import { AuthForm, bootstrapUser } from 'context/auth-context';
import { AppDispatch } from 'store';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = AuthSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then(user => dispatch(setUser(user)));

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then(user => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) => bootstrapUser().then(user => dispatch(setUser(user)));
