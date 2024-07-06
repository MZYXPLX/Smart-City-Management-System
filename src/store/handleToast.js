import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'handleToast',
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
        state.items.push(action.payload);
    },
    select(state, action) {
      state.selectedId = action.payload;
    },
    remove(state, action) {
      delete state.items[action.payload];
    },
  },
});

export { actions as handleToastActions };
export { reducer as handleToastReducer };
