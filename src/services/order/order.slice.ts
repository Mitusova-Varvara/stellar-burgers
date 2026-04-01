import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrder
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TCurrentOrder = {
  bun: null | TIngredient;
  ingredients: TConstructorIngredient[];
};

const initialState: {
  isLoading: boolean;
  current: TCurrentOrder;
  orderData: TOrder | null;
  history: TOrdersData;
  feed: TOrdersData;
} = {
  isLoading: false,
  current: {
    bun: null,
    ingredients: []
  },
  orderData: null,
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

export const getFeedsThunk = createAsyncThunk(
  'orders/getAllOrders',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
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
        state.current.ingredients.push({
          ...payload,
          id: uuidv4()
        });
      }
    },
    makeOrder: (state, { payload }) => {
      state.history.orders.push(payload);
    },
    removeIngredient: (state, { payload }) => {
      state.current.ingredients = state.current.ingredients.filter(
        (item) => item.id !== payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      [
        state.current.ingredients[toIndex],
        state.current.ingredients[fromIndex]
      ] = [
        state.current.ingredients[fromIndex],
        state.current.ingredients[toIndex]
      ];
    },
    resetOrderData: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderData = {
        ...payload.order,
        ingredients: state.current.ingredients.map((item) => item._id)
      };
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
      state.orderData = payload.orders[0];
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

export const {
  addIngredientToOrder,
  makeOrder,
  removeIngredient,
  moveIngredient,
  resetOrderData
} = orderSlice.actions;

export default orderSlice.reducer;
