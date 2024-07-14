import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const reducer = {
  user: userReducer,
  // add more reducers here
};

const store = configureStore({
  reducer,
});

export default store;
