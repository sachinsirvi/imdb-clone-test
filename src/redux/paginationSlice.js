import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    moviePage: 1,
  },
  reducers: {
    setMoviePage: (state, action) => {
      state.moviePage = action.payload;
    },
  },
});

export const { setMoviePage } = paginationSlice.actions;
export default paginationSlice.reducer;
