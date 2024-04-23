import { configureStore } from '@reduxjs/toolkit';
import classSlice from './features/classSlice';
import categorySlice from './features/categorySlice';

const store = configureStore({
    reducer: {
        classList: classSlice,
        category: categorySlice
    },
});

export default store;