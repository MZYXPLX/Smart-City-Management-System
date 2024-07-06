// filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "filter",
  initialState: {
    filteredComplaints: [],
    selectedValue: "",
    selectedStatus: "",
    selectedOption: "",
    selectedDateFrom: "",
    selectedDateTo: "",
  },
  reducers: {
    // setFilteredComplaints: (state, action) => {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    clearFilterOptions: (state) => {
      return {
        selectedStatus: "",
        selectedOption: "",
        selectedDateFrom: "",
        selectedDateTo: "",
      };
    },
    setFilteredComplaints: (state, action) => {
      state.filteredComplaints = action.payload;
    },
    setDropdownValue: (state, action) => {
      state.selectedValue = action.payload
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload
    },
  },
});

export { actions as filterActions };
export { reducer as filterReducer };
