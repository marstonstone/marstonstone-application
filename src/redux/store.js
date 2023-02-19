import { configureStore } from "@reduxjs/toolkit";
import { builderReducer } from "./slices/builderSlice";
import { authReducer } from "./slices/authSlice";
import { orderReducer } from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    builder: builderReducer,
    order: orderReducer,
  },
});

export default store;
