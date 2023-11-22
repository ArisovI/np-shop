import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersItem } from "../../../types/index";

export const getUsers = createAsyncThunk<
  UsersItem[],
  void,
  { rejectValue: string }
>("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/users");
    if (response.status !== 200) return [];

    return response.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});
