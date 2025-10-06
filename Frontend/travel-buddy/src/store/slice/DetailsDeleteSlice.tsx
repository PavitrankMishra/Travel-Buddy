import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface deleteCityState {
    loading: boolean;
    success: boolean;
    successMessage: string;
    error: boolean;
    errorMessage: string;
}

const initialState: deleteCityState = {
    loading: false,
    success: false,
    successMessage: "",
    error: false,
    errorMessage: ""
}

export const deleteUserCities = createAsyncThunk("deleteCityForm", async ({ userId, cityId }, { rejectWithValue }) => {
    try {
        const res = await fetch(
            `https://travel-buddy-r69f.onrender.com/api/v1/cities/${userId}/${cityId}`,
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

const deleteCitySlice = createSlice({
    name: 'deleteCity',
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
        builder.addCase(deleteUserCities.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        })
            .addCase(deleteUserCities.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.successMessage = action.payload.message || "Success";
            })
            .addCase(deleteUserCities.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload as string;
            })
    }
});

export const { resetState } = deleteCitySlice.actions;
export default deleteCitySlice.reducer;