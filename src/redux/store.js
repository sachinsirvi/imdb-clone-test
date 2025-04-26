
import { configureStore } from "@reduxjs/toolkit";
// we need only reducer function thus we will name anything and import since we already exported slice.reducer

import paginationReducer from './paginationSlice';

const store = configureStore({
    reducer: {

        pagination: paginationReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',  
});

export default store;