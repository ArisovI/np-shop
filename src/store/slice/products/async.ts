import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsItem } from "../../../types";

export const getProducts = createAsyncThunk<
  ProductsItem[],
  void,
  { rejectValue: string }
>("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    if (response.status !== 200) return [];
    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
