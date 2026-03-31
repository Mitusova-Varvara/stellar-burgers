import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const initialState: { isLoading: boolean; ingredients: TIngredient[] } =
  {
    isLoading: false,
    ingredients: []
  };

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredients = payload;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export default ingredientsSlice.reducer;
