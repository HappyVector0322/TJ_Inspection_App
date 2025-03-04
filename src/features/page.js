import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: { value: 0 },
  reducers: {
    next: (state, action) => {
      state.value = state.value + 1;
      // save checking page to the localstorage
      localStorage.setItem('TJPurewal_checking_page', state.value.toString());
    },
    back: (state, action) => {
      state.value = state.value - 1;
      // save checking page to the localstorage
      localStorage.setItem('TJPurewal_checking_page', state.value.toString());
    },
    select: (state, action) => {
      console.log("select action:", action)
      const {selectedPage} = action.payload
      state.value = selectedPage;
      // save checking page to the localstorage
      localStorage.setItem('TJPurewal_checking_page', state.value.toString());
    },
  },
});
export const { back } = pageSlice.actions;
export const { next } = pageSlice.actions;
export const { select } = pageSlice.actions;
export default pageSlice.reducer;
