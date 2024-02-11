import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductsItem, ProductsItemCreate } from "../../../types";

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

export const deleteProduct = createAsyncThunk<
  boolean,
  number | undefined,
  { rejectValue: string }
>("products/deleteProducts", async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.delete(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    if (response.status !== 200) return [];
    dispatch(getProducts());
    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createProduct = createAsyncThunk<
  ProductsItem,
  ProductsItemCreate,
  { rejectValue: string }
>("products/createProduct", async (product, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/products",
      {
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
        images: ["https://api.lorem.space/image/fashion?w=640&h=480&r=4278"],
      }
    );
    if (response.status !== 201) return [];
    console.log(response.data);
    dispatch(getProducts());

    return response.data;
  } catch (e) {
    const error = e as Error;
    console.log(error);
    return rejectWithValue(error.message);
  }
});

export const updateProducts = createAsyncThunk<
  ProductsItem,
  ProductsItem,
  { rejectValue: string }
>("products/updateProducts", async (product, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${product.id}`,
      {
        title: product.title,
        price: product.price,
        description: product.description,
      }
    );
    if (response.status !== 200) return [];
    dispatch(getProducts());
    return response.data;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
    return rejectWithValue(error.message);
  }
});
