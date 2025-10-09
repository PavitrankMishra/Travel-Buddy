import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Interface for the structure of deleteCity
// Contains keys that represents information such as loading, success, error and message
interface deleteCityState {
    loading: boolean;
    success: boolean;
    error: boolean;
    message: string;
}

// Defines the initial state of delete city
const initialState: deleteCityState = {
    loading: false,
    success: false,
    error: false,
    message: "",
}

// Async thunk for deleting user city
// Delete usercity using userId and cityId 
export const deleteUserCities = createAsyncThunk<any, { userId: string, cityId: string }>("deleteCityForm", async ({ userId, cityId }, { rejectWithValue }) => {
    const deleteCityApi = process.env.EXPO_PUBLIC_DELETECITY_Api;
    try {
        const res = await fetch(
            `${deleteCityApi}${userId}/${cityId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        if (data.success === false) {
            return rejectWithValue(data.message || "Failed to add city");
        } else {
            return data;
        }
    } catch (err: any) {
        return rejectWithValue(err.message || "Something went wrong");
    }
});

// Redux slice for handling user city delete
// Manages loading, success, error and message
const deleteCitySlice = createSlice({
    name: 'deleteCity',
    initialState,
    reducers: {
        resetState: (state) => {
            state.error = false;
            state.success = false;
            state.loading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUserCities.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        })
            .addCase(deleteUserCities.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || "Success";
            })
            .addCase(deleteUserCities.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload as string;
            })
    }
});

export const { resetState } = deleteCitySlice.actions;
export default deleteCitySlice.reducer;