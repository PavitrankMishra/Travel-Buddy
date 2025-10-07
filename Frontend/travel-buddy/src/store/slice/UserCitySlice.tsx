import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface VisitedCity {
    _id: string;
    cityName: string;
    country: string;
    notes: string;
    visitedOn: string;
    lat: number;
    lng: number;
}

interface UserData {
    _id: string;
    userId: string;
    visitedCities: VisitedCity[];
    createdAt: string;
    updatedAt: string;
    _v: number;
}

interface UserCityState {
    loading: boolean;
    success: boolean;
    error: boolean;
    errorMessage: string;
    data: VisitedCity[];
}

const initialState: UserCityState = {
    loading: false,
    success: false,
    error: false,
    errorMessage: "",
    data: [],
}

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