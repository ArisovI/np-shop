import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CategoriesItem } from "../../../types";

export const getCategories = createAsyncThunk<
  CategoriesItem[],
  void,
  { rejectValue: string }
>("categories/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    if (response.status !== 200) return [];
    console.log(response);

    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
