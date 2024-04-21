import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { updateCreatedProjects } from "./user/userSlice.js"; // Import the new action
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Add a listener to persist updated state
store.subscribe(() => {
  const state = store.getState();
  const createdProjects = state.user.currentUser?.createdProjects;
  if (createdProjects) {
    localStorage.setItem("createdProjects", JSON.stringify(createdProjects));
  }
});

export const persistor = persistStore(store);

// Add a function to update createdProjects from localStorage
export const hydrateStore = () => {
  const createdProjects = localStorage.getItem("createdProjects");
  if (createdProjects) {
    store.dispatch(updateCreatedProjects(JSON.parse(createdProjects)));
  }
};
