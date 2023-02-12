import { configureStore } from "@reduxjs/toolkit";
import { builderReducer } from "./slices/builderSlice";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    builder: builderReducer,
  },
});

export default store;
