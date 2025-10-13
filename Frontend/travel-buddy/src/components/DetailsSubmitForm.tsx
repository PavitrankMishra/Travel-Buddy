import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUserCities } from "../store/slice/UserCitySlice";
import { addUserCities, resetState } from "../store/slice/AddCitySlice";


// Type Declaration for DetailsSubmitForm component props
type DetailsSubmitFormProps = {
  markerCoordinates: { latitude: number, longitude: number };
  selectedCity: string;
  selectedCountry: string;
  setAddCityForm: React.Dispatch<SetStateAction<boolean>>;
}

const DetailsSubmitForm = ({ markerCoordinates, selectedCity, selectedCountry, setAddCityForm }: DetailsSubmitFormProps) => {
  // State that stores the description
  const [description, setDescription] = useState("");

  // Resets the value of description if coordinates of the marker are changed
  useEffect(() => {
    setDescription("");
  }, [markerCoordinates]);

  const dispatch = useDispatch<AppDispatch>();

  // Displays success if value is true otherwise false
  const cityAddSuccess = useSelector((state: any) => state.addCity.success);

  // Displays error if value is true otherwise false
  const cityAddError = useSelector((state: any) => state.addCity.error);

  // Contains the loading state
  const cityAddLoading = useSelector((state: any) => state.addCity.loading);

  // Contains the data of the logged in user
  const userData = useSelector((state: any) => state.userLogin.loginUser);

  // Runs when we click on addCity button
  const handleCitySubmit = () => {
    const sentData = {
      userId: userData._id,
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

    dispatch(addUserCities(sentData));
  }

  useEffect(() => {
    if (cityAddSuccess === true || cityAddError === true) {
      const timeout = setTimeout(() => {
        dispatch(resetState());
        setAddCityForm(false);
        dispatch(fetchUserCities(userData._id));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [cityAddSuccess, cityAddError]);


  return (
    <View className="bg-dark0 rounded-lg w-full items-center gap-y-4 py-4 ">
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
          {!cityAddLoading ? (
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
