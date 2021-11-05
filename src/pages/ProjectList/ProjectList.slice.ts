import { RootState } from './../../store/index';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const ProjectListSlice = createSlice({
  name: 'ProjectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const ProjectListActions = ProjectListSlice.actions;

export const SelectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
