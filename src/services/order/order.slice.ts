import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrder
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData
} from '@utils-types';

export type TCurrentOrder = {
  bun: null | TIngredient;
  ingredients: TConstructorIngredient[];
};

const initialState: {
  isLoading: boolean;
  current: TCurrentOrder;
  orderData: TOrder;
  history: TOrdersData;
  feed: TOrdersData;
} = {
  isLoading: false,
  current: {
    bun: null,
    ingredients: []
  },
  orderData: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  history: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const orderBurgerThunk = createAsyncThunk(
  'order/postNewOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumber',
  (number: number) => getOrderByNumberApi(number)
);

export const getFeedsThunk = createAsyncThunk('orders/getAllOrders', () =>
  getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk('orders/getAllOrdersUser', () =>
  getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredientToOrder: (state, { payload }) => {
      if (payload.type === 'bun') {
        state.current.bun = payload;
      } else {
        state.current.ingredients.push({ ...payload, id: payload._id });
      }
    },
    makeOrder: (state, { payload }) => {
      state.history.orders.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.current.bun = null;
      state.current.ingredients = [];
    });
    builder.addCase(orderBurgerThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.history.orders = payload.orders;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.feed = payload;
    });
    builder.addCase(getFeedsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.history.orders = payload;
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { addIngredientToOrder, makeOrder } = orderSlice.actions;

export default orderSlice.reducer;
