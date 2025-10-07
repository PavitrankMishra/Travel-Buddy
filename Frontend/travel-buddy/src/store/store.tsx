import { configureStore } from '@reduxjs/toolkit';
import addCityReducer from "../store/slice/AddCitySlice";
import userCityReducer from "../store/slice/UserCitySlice";
import userRegistrationReducer from "../store/slice/UserRegistrationSlice";
import userLoginReducer from "../store/slice/UserLoginSlice";
import deleteCityReducer from "../store/slice/DetailsDeleteSlice";

export const store = configureStore({
    reducer: {
        addCity: addCityReducer,
        userCity: userCityReducer,
        userRegistration: userRegistrationReducer,
        userLogin: userLoginReducer,
        deleteCity: deleteCityReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;