import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const DetailsSubmitForm = ({
  markerCoordinates,
  selectedCity,
  userId,
  selectedCountry,
  fetchCitiesList,
  addCityLoading,
  setAddCityLoading,
  addCityForm,
  setAddCityForm,
  success,
  setSuccess,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage
}) => {
  // State that stores the description
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription("");
  }, [markerCoordinates]);

  
  const submitForm = async (sentData) => {
    try {
      setAddCityLoading(true);
      const res = await fetch(
        "https://travel-buddy-r69f.onrender.com/api/v1/cities/addCity",
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
        throw new Error(data.message);
      } else {
        setSuccessMessage(data.message);
        setTimeout(() => {
          setAddCityLoading(false);
          setAddCityForm(false);
          setSuccess(true);
        }, 2000);
        fetchCitiesList();
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage("");
        }, 5000);
      }
    } catch (err) {
      setAddCityLoading(false);
      setErrorMessage(err.message);
      setTimeout(() => {
        setAddCityForm(false);
        setError(true);
      }, 2000);

      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
      console.log(err);
    }
  };

  const handleCitySubmit = () => {
    if (selectedCity.length < 0 || description.length < 0) {
      setError(true);
      setAddCityForm(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const sentData = {
        userId: userId,
        visitedCities: [
          {
            cityName: selectedCity,
            country: selectedCountry,
            notes: description,
            visitedOn: new Date().toISOString().split("T")[0],
            lat: markerCoordinates.latitude,
            lng: markerCoordinates.longitude,
          },
        ],
      };
      submitForm(sentData);
    }
  };

  return (
    <View className="-bg--color-dark--0 rounded-lg w-full items-center gap-y-4 py-4 ">
      <TextInput
        placeholder="City Name"
        className="border border-gray-400 w-[90%] items-center justify-center rounded-lg text-white tracking-widest pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={selectedCity}
      ></TextInput>
      <TextInput
        placeholder="Description"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={description}
        onChangeText={(text) => setDescription(text)}
      ></TextInput>
      <TextInput
        placeholder="Date of Visit"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        defaultValue={new Date().toISOString().split("T")[0]}
      ></TextInput>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 flex items-center justify-center rounded-lg h-12"
          onPress={() => handleCitySubmit()}
        >
          {!addCityLoading ? (
            <Text className="text-white text-center text-xl tracking-widest py-3">
              Add City
            </Text>
          ) : (
            <Spinner />
          )}
        </TouchableOpacity>
      </View>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 flex items-center justify-center rounded-lg h-12"
          onPress={() => setAddCityForm(false)}
        >
          <Text className="text-white text-center text-xl tracking-widest py-3">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsSubmitForm;
