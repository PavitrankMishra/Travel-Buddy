import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect } from "react";

const DetailsDeleteForm = ({handleDelete, showForm, setShowForm, markerCoordinates, currentCity, userId, selectedCountry, currentDescription}) => {
    useEffect(() => {
        console.log("The selected city is: ", currentCity);
        console.log("The marekre coordinates are: ", markerCoordinates);
    }, []);
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
          <Text className="text-white text-center text-xl tracking-widest">
            Delete City
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity
          className="bg-green-600 h-10 flex items-center justify-center rounded-lg"
          onPress={() => setShowForm(false)}
        >
          <Text className="text-white text-center text-xl tracking-widest">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsDeleteForm;
