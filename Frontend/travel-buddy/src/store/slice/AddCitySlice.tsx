import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Interface for the structure of add city
// Contains keys that represents information such as loading, success, successMessage, error and errorMessage
interface AddCityState {
    loading: boolean;
    success: boolean;
    successMessage: string;
    error: boolean;
    errorMessage: string;
}

// Define the initial state for add city
const initialState: AddCityState = {
    loading: false,
    success: false,
    successMessage: "",
    error: false,
    errorMessage: ""
}

// Async thunk for adding a new city
// Adds a new city using the sent data
export const addUserCities = createAsyncThunk<any>("submitCityForm", async (sentData, { rejectWithValue }) => {
    const addCityApi = process.env.EXPO_PUBLIC_ADDCITY_Api;

    if (!addCityApi) {
        throw new Error("Add city Api endpoint is not defined");
    }

    try {
        const res = await fetch(addCityApi,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sentData),
            }
        );

        const data = await res.json();

        if (data.success === false) {
            return rejectWithValue(data.message || "Failed to add city")
        } else {
            return data;
        }


    } catch (err: any) {
        return rejectWithValue(err.message || "Something went wrong");
    }
});

// Redux slice for handling add city slice
// Manages error, success, errorMessage, successMessage, loading
const addCitySlice = createSlice({
    name: 'addCity',
    initialState,
    reducers: {
        resetState: (state) => {
            state.error = false;
            state.success = false;
            state.errorMessage = "";
            state.successMessage = "";
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addUserCities.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
            .addCase(addUserCities.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.successMessage = action.payload.message || "Success";
            })
            .addCase(addUserCities.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload as string;
            })
    }
});

export const { resetState } = addCitySlice.actions;
export default addCitySlice.reducer;