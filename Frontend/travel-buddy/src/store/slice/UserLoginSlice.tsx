import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userData {
    _id: string,
    userName: string,
    email: string,
    phone: string,
    __v: number
}

interface loginData {
    success: boolean,
    error: boolean,
    message: string,
    loading: boolean,
    loginUser: userData
}


const initialState: loginData = {
    success: false,
    error: false,
    message: "",
    loading: false,
    loginUser: {
        _id: "",
        userName: "",
        email: "",
        phone: "",
        __v: 0,
    }
}


export const loginUser = createAsyncThunk("loginUser", async (loginData: { email: string, password: string }, { rejectWithValue }) => {
    const { email, password } = loginData;

    if (!email || !password) {
        return rejectWithValue("All Fields Required");
    }

    const loginApi = process.env.EXPO_PUBLIC_Login_Api;

    try {
        const res = await fetch(loginApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        const data = await res.json();

        if (!data.success) {
            return rejectWithValue(data.message || "Failed to register");
        }
        
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Something went wrong");
    }
});

const userLoginSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        resetState: (state) => {
            state.success = false;
            state.error = false;
            state.message = "";
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
            state.message = "";
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.message = action.payload.message;
                state.loginUser = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;

            })
    }
});

export const { resetState } = userLoginSlice.actions;
export default userLoginSlice.reducer;