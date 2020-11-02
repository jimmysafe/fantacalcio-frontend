import { createReducer } from "@reduxjs/toolkit";

const initState = {
  user: null
};

const reducer = createReducer(initState, {
  CURRENT_USER: (state, action) => {
    state.user = action.user;
  }
});

export default reducer;
