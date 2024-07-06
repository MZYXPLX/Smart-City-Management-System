import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "groups",
  initialState: {
    items: [],
    selected: [],
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => (state.items[item.id] = item));
    },
    addItem(state, action) {
      action.payload.forEach((item) => (state.selected[item.id] = item));
    },
    removeItem(state, action) {
      const index = state.selected.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.selected.splice(index, 1);
      }
    },
  },
});

export { actions as groupsActions };
export { reducer as groupsReducer };
