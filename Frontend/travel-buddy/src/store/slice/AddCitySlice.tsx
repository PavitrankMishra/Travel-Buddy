import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AddCityState {
    loading: boolean;
    success: boolean;
    successMessage: string;
    error: boolean;
    errorMessage: string;
}

const initialState: AddCityState = {
    loading: false,
    success: false,
    successMessage: "",
    error: false,
    errorMessage: ""
}

export const addUserCities = createAsyncThunk<any>("submitCityForm", async (sentData, { rejectWithValue }) => {
    const addCityApi = process.env.EXPO_PUBLIC_ADDCITY_Api;
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