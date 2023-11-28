import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateItem, UsersItem } from "../../../types/index";

export const getUsers = createAsyncThunk<
  UsersItem[],
  void,
  { rejectValue: string }
>("users/getUsers", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/users");
    if (response.status !== 200) return [];
    dispatch(getUsers());
    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createUser = createAsyncThunk<
  UsersItem,
  UsersItem,
  { rejectValue: string }
>("users/createUser", async (newUser, { rejectWithValue }) => {
  try {
    const response = await axios.post("https://api.escuelajs.co/api/v1/users", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      avatar: "https://picsum.photos/800",
    });
    if (response.status !== 200) return [];
    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk<
  UsersItem,
  UsersItem,
  { rejectValue: string }
>("users/updateUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${user.id}`,
      user
    );
    if (response.status !== 200) return [];

    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk<
  boolean,
  number | undefined,
  { rejectValue: string }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `https://api.escuelajs.co/api/v1/users/${id}`
    );
    if (response.status !== 200) return [];

    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
