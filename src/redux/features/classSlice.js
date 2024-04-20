import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    classList: [],
}

const classSlice = createSlice({
    name: "classSlice",
    initialState,
    reducers: {},
});

export default classSlice.reducer;