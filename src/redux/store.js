import { configureStore } from "@reduxjs/toolkit";
// import { coinsReducer } from "./slices/coinsSlice";
// import { settingsReducer } from "./slices/settingsSlice";

const store = configureStore({
  reducer: {
    // coins: coinsReducer,
    // settings: settingsReducer,
  },
});

export default store;
