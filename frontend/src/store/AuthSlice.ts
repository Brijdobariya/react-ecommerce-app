import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
interface AuthState {
  value: 0;
}

// Define the initial state using that type
const initialState: AuthState = {
  value: 0,
};

export const AuthSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = AuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default AuthSlice.reducer;
