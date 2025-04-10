import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  request: boolean;
  responseOrder: null;
  orderByNumberResponse: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  request: false,
  responseOrder: null,
  orderByNumberResponse: null,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.request = false;
        state.orderByNumberResponse = action.payload.orders[0];
        state.error = null;
      });
  },
  selectors: {
    getOrderState: (state) => state
  }
});

export default orderSlice.reducer;
export const { getOrderState } = orderSlice.selectors;
