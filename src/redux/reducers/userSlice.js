import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    auth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set the user and update authentication status
        setUser: (state, action) => {
            state.user = action.payload;
            state.auth = true; // Set auth to true when user data is set
        },
        // Reset user state and authentication status
        resetUser: (state) => {
            state._id = "";
            state.user = null;
            state.auth = false;
        },
    },
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Export reducer to be used in the store
export default userSlice.reducer;
