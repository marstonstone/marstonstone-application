import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internalApi from "../apis/internalApi";

const initialState = {
  builder: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new builder
export const createBuilder = createAsyncThunk(
  "builder/create",
  async (builderData, thunkAPI) => {
    try {
      //Get the token for user in auth
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.createBuilder(builderData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update  builder
export const updateBuilder = createAsyncThunk(
  "builder/update",
  async (builderData, thunkAPI) => {
    try {
      //Get the token for user in auth
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.updateBuilder(builderData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//fetch all builders
export const getBuilders = createAsyncThunk(
  "builder/getAll",
  async (_, thunkAPI) => {
    try {
      //get the token from user in auth user
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.getBuilders(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//fetch single builder
export const getBuilder = createAsyncThunk(
  "builder/get",
  async (builderId, thunkAPI) => {
    try {
      return await internalApi.getBuilder(builderId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete single builder
export const deleteBuilder = createAsyncThunk(
  "builder/delete",
  async (builderId, thunkAPI) => {
    try {
      //get the token from user in auth user
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.deleteBuilder(builderId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBuilder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(createBuilder.fulfilled, (state) => {
        state.createSuccess = true;
        state.isLoading = false;
      })
      .addCase(createBuilder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getBuilders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.createSuccess = false;
      })
      .addCase(getBuilders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.builders = action.payload;
      })
      .addCase(getBuilders.rejected, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBuilder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(getBuilder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.builder = action.payload;
      })
      .addCase(getBuilder.rejected, (state, action) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteBuilder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(deleteBuilder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.builders = action.payload;
      })
      .addCase(deleteBuilder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBuilder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(updateBuilder.fulfilled, (state, action) => {
        state.createSuccess = true;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateBuilder.rejected, (state, action) => {
        state.isLoading = false;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = builderSlice.actions;
export const builderReducer = builderSlice.reducer;
