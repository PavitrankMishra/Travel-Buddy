import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

const DetailsSubmitForm = () => {
  return (
    <View className="-bg--color-dark--0 rounded-lg w-full items-center gap-y-4 py-4 ">
      <TextInput
        placeholder="City Name"
        className="border border-gray-400 w-[90%] items-center justify-center rounded-lg text-white tracking-widest pl-4 text-xl"
        placeholderTextColor="white"
      ></TextInput>
      <TextInput
        placeholder="Description"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
      ></TextInput>
      <TextInput
        placeholder="Date of Visit"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
      ></TextInput>
      <TextInput
        placeholder="Latitude"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
      ></TextInput>
      <TextInput
        placeholder="Longitude"
        className="border border-gray-400 w-[90%] items-center justify-center text-white tracking-widest rounded-lg pl-4 text-xl"
        placeholderTextColor="white"
      ></TextInput>
      <View className="w-[90%] rounded-lg">
        <TouchableOpacity className="bg-green-600 h-10 flex items-center justify-center rounded-lg">
          <Text className="text-white text-center text-xl tracking-widest">Add City</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsSubmitForm;
