import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categroyData: [],
};

const categorySlice = createSlice({
    initialState,
    name: "categorySlice",
    reducers: {},
});


export default categorySlice.reducer;