import { createSlice } from '@reduxjs/toolkit'
import { UsersState } from './types'

const initialState: UsersState = {
    users: [],
    isLoading: false,
    isError: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {


    },
})

export default usersSlice.reducer