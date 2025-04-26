
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {value:0},
    reducers: {
        increment: (state)=> {state.value += 1},
        decrement: (state)=> {state.value -= 1},
        reset: (state)=>{state.value = 0}, 
    }
});
//extracting the action creators from counterSlice.actions so you can use them in components with dispatch().
export const {increment, decrement, reset} = counterSlice.actions;
//You’re exporting the reducer as default so it can be added to your store.
export default counterSlice.reducer;