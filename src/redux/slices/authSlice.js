import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  username: window.localStorage.getItem("username") || "charlesyehtw",
  email: window.localStorage.getItem("email") || "charlesyehtw@gmail.com",
  role: window.localStorage.getItem("role") || "admin",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.username = null;
      state.email = null;
      state.role = null;
    },
    setUsername: (state, action) => {
      window.localStorage.setItem("username", action.payload);
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      window.localStorage.setItem("email", action.payload);
      state.email = action.payload;
    },
    setRole: (state, action) => {
      window.localStorage.setItem("role", action.payload);
      state.role = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUsername, setEmail, setRole, reset } = authSlice.actions;

export const authReducer = authSlice.reducer;
