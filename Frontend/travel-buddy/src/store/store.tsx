import { configureStore } from '@reduxjs/toolkit';
import addCityReducer from "../store/slice/AddCitySlice";
import userCityReducer from "../store/slice/UserCitySlice";
import userRegistrationReducer from "../store/slice/UserRegistrationSlice";

export const store = configureStore({
    reducer: {
        addCity: addCityReducer,
        userCity: userCityReducer,
        userRegistration: userRegistrationReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;