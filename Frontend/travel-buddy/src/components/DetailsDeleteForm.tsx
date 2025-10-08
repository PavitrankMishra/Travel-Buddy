import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteUserCities, resetState } from "../store/slice/DetailsDeleteSlice";
import { fetchUserCities } from "../store/slice/UserCitySlice";

// Type Declaration for DetailsDeleteForm component
type DetailsDeleteFormProps = {
  setDeleteCityForm: React.Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  currentDescription: string;
  selectedCityId: string;
}

const DetailsDeleteForm = ({ setDeleteCityForm, currentCity, currentDescription, selectedCityId }: DetailsDeleteFormProps) => {
  // Typed redux disptach for dispatching actions
  const dispatch = useDispatch<AppDispatch>();

  // Contains the data of the loggedin user
  const loginUserData = useSelector((state: any) => state.userLogin.loginUser);

  // Function that helps to delete city
  function handleDelete() {
    // Dispatch action to delete city
    dispatch(deleteUserCities({ userId: loginUserData._id, cityId: selectedCityId }));
  };

  // Displays error message if value is true
  const cityDeleteError = useSelector((state: any) => state.deleteCity.error);

  // Displays success message if values is true
  const cityDeleteSuccess = useSelector((state: any) => state.deleteCity.success);

  // Displays spiner if the value is true
  const cityDeleteLoading = useSelector((state: any) => state.deleteCity.loading);

  // Contains the message to be displayed
  const cityDeleteMessage = useSelector((state: any) => state.deleteCity.message);

  // Runs if the value of cityDeleteError, cityDeleteSucess changes
  useEffect(() => {
    if (cityDeleteSuccess === true || cityDeleteError === true) {
      setTimeout(() => {
        // Dispatch action to reset state
        dispatch(resetState());

        // Disptach action to fetch user cities
        dispatch(fetchUserCities(loginUserData._id));

        // Hides the delete city form after the value is set to false
        setDeleteCityForm(false);
      }, 2000);
    }
  }, [cityDeleteError, cityDeleteSuccess,]);

  return (
    <View className="-bg--color-dark--0 rounded-lg w-full items-center gap-y-4 py-4 ">
      <TextInput
        placeholder="City Name"
        className="border border-gray-400 w-[90%] items-center justify-center rounded-lg text-white tracking-widest pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={currentCity}
      ></TextInput>
      <TextInput
        placeholder="Description"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={currentDescription}
      ></TextInput>
      <TextInput
        placeholder="Date of Visit"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={new Date().toISOString().split("T")[0]}
      ></TextInput>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 h-10 flex items-center justify-center rounded-lg"
          onPress={() => handleDelete()}
        >
          {!cityDeleteLoading ? (
            <Text className="text-white text-center text-xl tracking-widest">
              Delete City
            </Text>
          ) : (
            <Spinner />
          )}
        </TouchableOpacity>
      </View>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 h-10 flex items-center justify-center rounded-lg"
          onPress={() => setDeleteCityForm(false)}
        >
          <Text className="text-white text-center text-xl tracking-widest" >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsDeleteForm;
