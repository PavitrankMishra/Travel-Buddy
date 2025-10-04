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
  fetchCitiesList
}) => {
  useEffect(() => {
    console.log("The selected city is: ", currentCity);
    console.log("The marekre coordinates are: ", markerCoordinates);
    console.log("The value of delete city loading: ", deleteCityLoading);
  }, []);

  const handleCityDelete = async (userId: string, cityId: string) => {
    console.log("The user id is: ", userId);
    console.log("The city id is: ", cityId);
    console.log("This is called");
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

      if (!res.ok) {
        console.log(res);
        throw new Error(res);
      }

      setTimeout(() => {
        setDeleteCityLoading(false);
        setDeleteCityForm(false);
      }, 2000);
      console.log("City deleted successfully:", data);

      fetchCitiesList();
    } catch (err) {
      console.error("Error in deleting city:", err);
      setDeleteCityLoading(false);
      setDeleteCityForm(false);
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
