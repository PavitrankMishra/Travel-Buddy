import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteUserCities, resetState } from "../store/slice/DetailsDeleteSlice";
import { fetchUserCities } from "../store/slice/UserCitySlice";

const DetailsDeleteForm = ({
  markerCoordinates,
  currentCity,
  selectedCountry,
  currentDescription,
  deleteCityLoading,
  deleteCityForm,
  setDeleteCityLoading,
  setDeleteCityForm,
  selectedCityId
}) => {

  const dispatch = useDispatch();

  const loginUserData = useSelector((state: any) => state.userLogin.loginUser);

  function handleDelete() {
    console.log("This is called");
    console.log("The value is: ", loginUserData._id);
    console.log("The value is: ", selectedCityId);
    dispatch(deleteUserCities({ userId: loginUserData._id, cityId: selectedCityId }));
  };

  const cityDeleteError = useSelector((state: any) => state.deleteCity.error);
  const cityDeleteSuccess = useSelector((state: any) => state.deleteCity.success);
  const cityDeleteLoading = useSelector((state: any) => state.deleteCity.loading);
  const cityDeleteMessage = useSelector((state: any) => state.deleteCity.message);

  useEffect(() => {
    if (cityDeleteSuccess === true || cityDeleteError === true) {
      setTimeout(() => {
        dispatch(resetState());
        dispatch(fetchUserCities(loginUserData._id));
        setDeleteCityForm(false);
      }, 2000);
    }
  }, [cityDeleteError, cityDeleteSuccess, cityDeleteLoading, cityDeleteMessage]);

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
