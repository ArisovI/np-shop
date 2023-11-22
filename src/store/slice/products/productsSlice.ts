import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./async";
import { ProductsState } from "../../../types";

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  isError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default productsSlice.reducer;
