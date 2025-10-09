import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Interface for the structure of visitedcity
// Contains keys that represents information such as cityName, country, notes
interface VisitedCity {
    _id: string;
    cityName: string;
    country: string;
    notes: string;
    visitedOn: string;
    lat: number;
    lng: number;
}

// Interface for the structure of of user city
// Contains the keys that represents success, error, loading, errorMessage and data
interface UserCityState {
    loading: boolean;
    success: boolean;
    error: boolean;
    errorMessage: string;
    data: VisitedCity[];
}

// Define the initial state for user city
const initialState: UserCityState = {
    loading: false,
    success: false,
    error: false,
    errorMessage: "",
    data: [],
}

// Async thunk for fetching user cities
// Fetch user cities using userId and returns list of visited cities
export const fetchUserCities = createAsyncThunk("fetchCity", async (userId, { rejectWithValue }) => {
    const userCityApi = process.env.EXPO_PUBLIC_USER_CITY_Api;
    try {
        const res = await fetch(`${userCityApi}${userId}`);

        if (!res.ok) {
            return rejectWithValue("Error");
        }

        const data = await res.json();
        return data.data.visitedCities;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
})

// Redux slice for handling user city state
// Manages loading, success, error, errorMessage, data 
const userCitySlice = createSlice({
    name: 'userCities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserCities.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        })
            .addCase(fetchUserCities.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = false;
                state.data = action.payload;
            })
            .addCase(fetchUserCities.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload as string;
            })
    }
});

export default userCitySlice.reducer;