import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from "expo-location";
import DetailsSubmitForm from "../components/DetailsSubmitForm";
import DetailsDeleteForm from "../components/DetailsDeleteForm";
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../store/store';
import { fetchUserCities } from '../store/slice/UserCitySlice';

type City = {
  _id: string;
  cityName: string;
  country: string;
  lat: number;
  lng: number;
  notes: string;
  visitedOn: string;
};

const HomeScreen = ({ navigation, route }) => {

  // Gets the redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Displays success if value is true otherwise false
  const cityAddSuccess = useSelector((state: any) => state.addCity.success);

  // Contains the success message
  const cityAddSuccessMessage = useSelector((state: any) => state.addCity.successMessage);

  // Displays error if value is true otherwise false
  const cityAddError = useSelector((state: any) => state.addCity.error);

  // Contains the error message
  const cityAddErrorMessage = useSelector((state: any) => state.addCity.errorMessage);

  // Displays spinner if loading is true 
  const cityAddLoading = useSelector((state: any) => state.addCity.loading);

  const loginUserData = useSelector((state: any) => state.userLogin.loginUser);

  useEffect(() => {
    console.log(loginUserData);
    console.log(loginUserData._id);
  }, []);

  // Data of the user after successfull login
  // const { userData } = route.params;

  // State that defines the initial region of the map
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Loading state for delete city
  const [deleteCityLoading, setDeleteCityLoading] = useState<boolean>(false);

  // Display add city form when value is true
  const [deleteCityForm, setDeleteCityForm] = useState<boolean>(false);

  // State to toggle add city form display
  const [addCityForm, setAddCityForm] = useState<boolean>(false);

  // State that stores the country of the selected marker
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // State that stores the id of the logged in  user
  const [userId, setUserId] = useState<string>("");

  // State that contains the name of the selected visited city
  const [currentCity, setCurrentCity] = useState<string>("");

  // State that contains the description of the selected visited city
  const [currentDescription, setCurrentDescription] = useState<string>("");

  // State that contains the id of the selected city
  const [selectedCityId, setSelectedCityId] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  // State that contains the coordinates of live location
  const [currentCoords, setCurrentCoords] = useState<{ latitude: number | null, longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const userCity = useSelector((state: any) => state.userCity.data);
  useEffect(() => {
    dispatch(fetchUserCities(loginUserData._id));
    console.log("The data od user cties is: ", userCity);
  }, []);

  // Function that fires when a marker is pressed
  const handleMarkerPress = (c) => {
    console.log("The details on marker click is: ", c.country);
    // Sets the city when the marker is pressed
    setCurrentCity(c.cityName);
    setCurrentDescription(c.notes);
    setSelectedCityId(c._id);
    setDeleteCityForm(true);
  }

  useEffect(() => {
    console.log(selectedCityId);
  }, [selectedCityId]);

  // State that sets the marker coordinates when map is clicked
  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  // Function that zoomIn and zoomOut on the basis of delta value
  const handleZoom = (zoomIn) => {
    setRegion((prevRegion) => {
      const zoomFactor = 0.5;
      return {
        ...prevRegion,
        latitudeDelta: zoomIn
          ? prevRegion.latitudeDelta * zoomFactor
          : prevRegion.latitudeDelta / zoomFactor,
        longitudeDelta: zoomIn
          ? prevRegion.longitudeDelta * zoomFactor
          : prevRegion.longitudeDelta / zoomFactor,
      };
    });
  };

  // Function that gets the data of the selected city
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus !== "granted") {
        alert("Permission denied to access location.");
        return;
      }
    }

    // State that sets the current latitude and longitude coordinates  
    setMarkerCoordinates({ latitude, longitude });

    // State that displays city add form
    setAddCityForm(true);

    setDeleteCityForm(false);

    // Access address of the selected location
    let [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

    // Sets the current selected city 
    setSelectedCity(address.city);

    // Sets the current selected country
    setSelectedCountry(address.country);
  };

  const getMyCurrentLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus !== "granted") {
        alert("Permission denied to access location");
        return;
      }
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;

    // Update state
    setCurrentCoords({ latitude, longitude });

    // Update region directly using the fetched coordinates
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  const cityDeleteError = useSelector((state: any) => state.deleteCity.error);
  const cityDeleteSuccess = useSelector((state: any) => state.deleteCity.success);
  const cityDeleteLoading = useSelector((state: any) => state.deleteCity.loading);
  const cityDeleteMessage = useSelector((state: any) => state.deleteCity.message);

  return (
    <View style={{ flex: 1 }} >
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        onPress={handleMapPress}
      >
        {userCity && userCity.length > 0 && userCity.map((c) => {
          return (
            <Marker
              coordinate={{ latitude: c.lat, longitude: c.lng }}
              title={c.cityName}
              description={c.notes}
              key={c._id}
              onPress={() => handleMarkerPress(c)}
            />
          )
        })}
        {addCityForm && markerCoordinates && <Marker coordinate={markerCoordinates} />}
      </MapView>
      {addCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsSubmitForm markerCoordinates={markerCoordinates} selectedCity={selectedCity} selectedCountry={selectedCountry} addCityForm={addCityForm} setAddCityForm={setAddCityForm} />
        </View>
      )}

      {deleteCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsDeleteForm markerCoordinates={markerCoordinates} currentCity={currentCity} selectedCountry={selectedCountry} currentDescription={currentDescription} deleteCityLoading={deleteCityLoading} deleteCityForm={deleteCityForm} setDeleteCityLoading={setDeleteCityLoading} setDeleteCityForm={setDeleteCityForm} selectedCityId={selectedCityId} />
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 50 }} className='w-[100%] flex items-center '>
        <TouchableOpacity onPress={() =>
          getMyCurrentLocation()
        } className='w-44 h-[40] flex items-center justify-center rounded-lg bg-green-600'>
          <Text className='text-center text-white tracking-widest'>Current Location</Text>
        </TouchableOpacity>
      </View>

      {(cityAddSuccess || cityDeleteSuccess) && (
        <View style={{ position: 'absolute', bottom: 100, left: -5 }} className='rounded-lg bg-green-200 w-[250] h-12 flex justify-center items-center border-2 border-green-600'>
          <Text className='text-green-600 tracking-widest text-xl '>{cityAddSuccessMessage ? cityAddSuccessMessage : cityDeleteMessage}</Text>
        </View>
      )}

      {(cityAddError || cityDeleteError) && (
        <View style={{ position: 'absolute', bottom: 100, left: -5 }} className='rounded-lg bg-red-200 w-[250] h-12 flex justify-center items-center border-2 border-red-600'>
          <Text className='text-red-600 tracking-widest text-xl'>{cityAddErrorMessage ? cityAddErrorMessage : cityDeleteMessage}</Text>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
        <TouchableOpacity onPress={() =>
          handleZoom(true)} style={{ marginBottom: 10 }}>
          <FontAwesome name="search-plus" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleZoom(false)}>
          <FontAwesome name="search-minus" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
