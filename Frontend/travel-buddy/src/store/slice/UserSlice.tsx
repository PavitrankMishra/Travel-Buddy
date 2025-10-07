import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    id: string;
    name: string;
    email: string;
    phone: string;
    isLoggedIn: boolean;
};

const initialState: UserState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

    }
});

export default userSlice.reducer;