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
    addWingToProject: (state, action) => {
      const projectIndex = state.projects.findIndex(
        (project) => project._id === action.payload.projectId
      );
      if (projectIndex !== -1) {
        const project = state.projects[projectIndex];
        if (project) {
          project.createdWings.push(action.payload.wingId);
        } else {
          console.error("Project not found in state");
        }
      } else {
        console.error("Project ID not found in state projects array");
      }
    },
    // addFloorsToWing: (state, action) => {
    //   const { projectId, wingId, createdFloors } = action.payload;
    //   const projectIndex = state.projects.findIndex(
    //     (project) => project._id === projectId
    //   );
    //   if (projectIndex !== -1) {
    //     const project = state.projects[projectIndex];
    //     const wingIndex = project.createdWings.findIndex(
    //       (wing) => wing._id === wingId
    //     );
    //     if (wingIndex !== -1) {
    //       project.createdWings[wingIndex].createdFloors = createdFloors;
    //     } else {
    //       console.error("Wing not found in project");
    //     }
    //   } else {
    //     console.error("Project ID not found in state projects array");
    //   }
    // },
    cleanProjectsArray: (state) => {
      // Filter out null values from the projects array
      state.projects = state.projects.filter((project) => project !== null);
    },
  },
});

export const {
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailure,
  addWingToProject,
  addFloorsToWing,
  cleanProjectsArray,
} = projectSlice.actions;

export default projectSlice.reducer;
