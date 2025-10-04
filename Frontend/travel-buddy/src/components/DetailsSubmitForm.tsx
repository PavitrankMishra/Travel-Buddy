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
      if (!res.ok) {
        throw new Error("Response as not ok");
      }

      setTimeout(() => {
        setAddCityLoading(false);
        setAddCityForm(false);
      }, 2000);
      const data = await res.json();
      fetchCitiesList();
    } catch (err) {
      setAddCityLoading(false);
      setTimeout(() => {
        setAddCityForm(false);
      }, 2000);
      console.log(err);
    }
  };

  const handleCitySubmit = () => {
    if (selectedCity.length < 0 || description.length < 0) {
      console.log("This will be called because the length is less than 0");
    } else {
      console.log(
        "This will be clicked because the length is greater than zero"
      );
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

      console.log("The sent data is: ", sentData);
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
      {/* <TextInput
        placeholder="Latitude"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        value={markerCoordinates.latitude.toFixed(4).toString()}
      ></TextInput>
      <TextInput
        placeholder="Longitude"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
        value={markerCoordinates.longitude.toFixed(4).toString()}
      ></TextInput> */}
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 h-10 flex items-center justify-center rounded-lg"
          onPress={() => handleCitySubmit()}
        >
          {!addCityLoading ? (
            <Text className="text-white text-center text-xl tracking-widest">
              Add City
            </Text>
          ) : (
            <Spinner />
          )}
        </TouchableOpacity>
      </View>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 h-10 flex items-center justify-center rounded-lg"
          onPress={() => setAddCityForm(false)}
        >
          <Text className="text-white text-center text-xl tracking-widest">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsSubmitForm;
