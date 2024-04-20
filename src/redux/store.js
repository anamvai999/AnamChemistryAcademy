import { configureStore } from '@reduxjs/toolkit';
import classSlice from './features/classSlice';

const store = configureStore({
    reducer: {
        classList: classSlice,
    },
});

export default store;