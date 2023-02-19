import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internalApi from "../apis/internalApi";

const initialState = {
  order: {
    fName: "",
    lName: "",
    mobile: "",
    email: "",
    companyName: "",
    ABN: "",
    requestInstall: "yes",
    address: {
      unitNo: "",
      streetNo: "",
      streetName: "",
      suburb: "",
      city: "",
      state: "",
      postCode: "",
      country: "",
    },
    isUpstairs: "no",
    floors: "",
    specialCondition: "",
    supplier: "Lavi Stone",
  },
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new order
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, thunkAPI) => {
    try {
      //Get the token for user in auth
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.createOrder(orderData, token);
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

//update  order
export const updateOrder = createAsyncThunk(
  "order/update",
  async (orderData, thunkAPI) => {
    try {
      //Get the token for user in auth
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.updateOrder(orderData, token);
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

//fetch all Orders
export const getOrders = createAsyncThunk(
  "order/getAll",
  async (_, thunkAPI) => {
    try {
      //get the token from user in auth user
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.getOrders(token);
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

//fetch single Order
export const getOrder = createAsyncThunk(
  "order/get",
  async (OrderId, thunkAPI) => {
    try {
      return await internalApi.getOrder(OrderId);
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

//delete single order
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (orderId, thunkAPI) => {
    try {
      //get the token from user in auth user
      const token = thunkAPI.getState().auth.user.token;
      return await internalApi.deleteOrder(orderId, token);
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

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    reset: (state) => initialState,
    cacheOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (Order) => {
    Order.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.createSuccess = false;
      state.isSuccess = false;
    })
      .addCase(createOrder.fulfilled, (state) => {
        state.createSuccess = true;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.createSuccess = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.Orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.Order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.Orders = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.createSuccess = false;
        state.isSuccess = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.createSuccess = true;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.createSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, cacheOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
