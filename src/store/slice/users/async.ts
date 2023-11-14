import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UsersItem, UsersState } from './types';

export const getUsers = createAsyncThunk<UsersItem, void, { rejectValue: string }>(
    'users/getUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users');
            if (response.status !== 200) return [];
            console.log(response);
            
            return response.data
        } catch (e) {
            const error = e as Error;
            console.log(error);
            
            return rejectWithValue(error.message)
        }
    }
)