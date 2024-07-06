import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'clinics',
  initialState: {
    items: [],
    selectedId: null,
  },
  reducers: {
    refresh(state, action) {
      state.items = {};
      action.payload.forEach((item) => state.items[item.id] = item);
    },
    update(state, action) {
      action.payload.forEach((item) => state.items[item.id] = item);
    },
    select(state, action) {
      state.selectedId = action.payload;
    },
    // remove(state, action) {
    //   delete state.items[action.payload];
    // },
    remove(state) {
      state.items = {};
    },
  },
});

export { actions as clinicsActions };
export { reducer as clinicsReducer };