import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./async";
import { CategoriesState } from "../../../types";

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  isError: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
