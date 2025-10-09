import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Interface for the structure of user data
// Contains keys that represents user information such as userName, email, password, phone and database identifiers
interface userData {
    userName: string,
    email: string,
    password: string,
    phone: string,
    _id: string,
    __v: number,
}

// Interface for the structure of registeration data 
// Contains the keys that represents success, error, message, loading and user object
interface registrationData {
    success: boolean,
    error: boolean,
    message: string,
    loading: boolean,
    user: userData,
}

// Define the initial state for user registration
const initialState: registrationData = {
    success: false,
    error: false,
    message: "",
    loading: false,
    user: {
        userName: "",
        email: "",
        password: "",
        phone: "",
        _id: "",
        __v: 0,
    }
}

// Async thunk for registering a new user
// Sends registration data to the API, handles validation, error and success response
export const registerUser = createAsyncThunk(
    "registerUser",
    async (registrationData: { userName: string; email: string; password: string; phone: string }, { rejectWithValue }) => {
        const { userName, email, password, phone } = registrationData;
        if (!userName || !email || !password || !phone) {
            return rejectWithValue("All Fields Required");
        }

        const registerApi = process.env.EXPO_PUBLIC_Register_Api;
        try {
            const res = await fetch(registerApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registrationData),
            });

            const data = await res.json();

            if (!data.success) {
                return rejectWithValue(data.message || "Failed to register user");
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Something went wrong");
        }
    }
);


// Redux slice for handling userRegistration state
// Manages loading, success, error, message and user object
const userRegistrationSlice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {
        resetState: (state) => {
            state.success = false;
            state.error = false;
            state.message = "";
            state.loading = false;
            state.user = {
                userName: "",
                email: "",
                password: "",
                phone: "",
                _id: "",
                __v: 0,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = "";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.message = action.payload.message;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            });
    }
})

export const { resetState } = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;