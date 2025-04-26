
import { configureStore } from "@reduxjs/toolkit";
// we need only reducer function thus we will name anything and import since we already exported slice.reducer
import counterReducer from './counterSlice';
import paginationReducer from './paginationSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,// counter: { value: 0 }, ✅ this becomes state.counter
        pagination: paginationReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',  
});

export default store;