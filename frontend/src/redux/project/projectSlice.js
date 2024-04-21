import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProjectStart: (state) => {
      state.loading = true;
    },
    createProjectSuccess: (state, action) => {
      state.projects.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    createProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectStart: (state) => {
      state.loading = true;
    },
    updateProjectSuccess: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload._id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      state.loading = false;
      state.error = false;
    },
    updateProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProject: (state) => {},
  },
});

export const {
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;
