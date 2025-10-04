import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const DetailsDeleteForm = ({
  markerCoordinates,
  currentCity,
  userId,
  selectedCityId,
  selectedCountry,
  currentDescription,
  deleteCityLoading,
  deleteCityForm,
  setDeleteCityLoading,
  setDeleteCityForm,
  fetchCitiesList,
  success,
  setSuccess,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage
}) => {
  const handleCityDelete = async (userId: string, cityId: string) => {
    try {
      setDeleteCityLoading(true);
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
        throw new Error(data.message);
      } else {
        setTimeout(() => {
          setDeleteCityLoading(false);
          setDeleteCityForm(false);
          setSuccess(true);
          setSuccessMessage(data.message);
        }, 2000);

        fetchCitiesList();
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage("");
        }, 5000);
      }

    } catch (err) {
      console.error("Error in deleting city:", err);
      setDeleteCityLoading(false);
      setErrorMessage(err.message);
      setTimeout(() => {
        setDeleteCityForm(false);
        setError(false);
      }, 2000);

      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  function handleDelete() {
    console.log("The user id is: ", userId);
    console.log("The city id id: ", selectedCityId);
    if (selectedCityId) {
      handleCityDelete(userId, selectedCityId);
    }
  };

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
          {!deleteCityLoading ? (
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
