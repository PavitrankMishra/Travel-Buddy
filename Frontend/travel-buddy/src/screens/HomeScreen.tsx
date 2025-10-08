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

const HomeScreen = ({ navigation, route }) => {

  // Gets the redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // State that defines the initial region of the map
  const [region, setRegion] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  /**
   * Access state from the addCity slice
   */

  // Displays success if value is true otherwise false
  const cityAddSuccess = useSelector((state: any) => state.addCity.success);

  // Contains the success message
  const cityAddSuccessMessage = useSelector((state: any) => state.addCity.successMessage);

  // Displays error if value is true otherwise false
  const cityAddError = useSelector((state: any) => state.addCity.error);

  // Contains the error message
  const cityAddErrorMessage = useSelector((state: any) => state.addCity.errorMessage);


  /**
   * Access state from the userLogin slice
   */

  // Stores the data of the user for login
  const loginUserData = useSelector((state: any) => state.userLogin.loginUser);

  // Display add city form when value is true
  const [deleteCityForm, setDeleteCityForm] = useState<boolean>(false);

  // State to toggle add city form display
  const [addCityForm, setAddCityForm] = useState<boolean>(false);

  // State that stores the country of the selected marker
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // State that contains the name of the selected visited city
  const [currentCity, setCurrentCity] = useState<string>("");

  // State that contains the description of the selected visited city
  const [currentDescription, setCurrentDescription] = useState<string>("");

  // State that contains the id of the selected city
  const [selectedCityId, setSelectedCityId] = useState("");

  // Contains the name of the city
  const [selectedCity, setSelectedCity] = useState("");

  // State that contains the coordinates of live location
  const [currentCoords, setCurrentCoords] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });

  /**
   * Access state from the userCitySlice
   */
  const userCity = useSelector((state: any) => state.userCity.data);
  useEffect(() => {
    dispatch(fetchUserCities(loginUserData._id));
  }, []);

  // Function that fires when a marker is pressed
  const handleMarkerPress = (c) => {
    // Sets the city name in current city
    setCurrentCity(c.cityName);

    // Sets the description for current city
    setCurrentDescription(c.notes);

    // Sets the id for selected city
    setSelectedCityId(c._id);

    // Displays delete city form
    setDeleteCityForm(true);
  }

  // State that sets the marker coordinates when map is clicked
  const [markerCoordinates, setMarkerCoordinates] = useState<{ latitude: number, longitude: number }>({ latitude: 0, longitude: 0 });

  // Type Declaration for handleZoom parameter
  type zoomType = {
    zoomIn: boolean,
  }

  // Zoom In the map if the value is true otherwise false
  const handleZoom = (zoomIn: zoomType) => {
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


  /**
   * Gives the crrent location coordinates
   * Updates the region based on the coordinates
   */
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

  // Display message if cityDeleteError is true
  const cityDeleteError = useSelector((state: any) => state.deleteCity.error);

  // Display message if cityDeleteSuccess is true
  const cityDeleteSuccess = useSelector((state: any) => state.deleteCity.success);

  // Display spinner ig cityDeleteLoading is true
  const cityDeleteLoading = useSelector((state: any) => state.deleteCity.loading);

  // Contains the message to be displayed
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
        {(currentCoords.latitude != null && currentCoords.longitude != null) && <Marker coordinate={currentCoords} onPress={handleMapPress} />}
      </MapView>
      {addCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsSubmitForm markerCoordinates={markerCoordinates} selectedCity={selectedCity} selectedCountry={selectedCountry} setAddCityForm={setAddCityForm} />
        </View>
      )}

      {deleteCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsDeleteForm setDeleteCityForm={setDeleteCityForm} currentCity={currentCity} currentDescription={currentDescription} selectedCityId={selectedCityId} />
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 50 }} className='w-[100%] flex items-center '>
        <TouchableOpacity className='w-44 h-[40] flex items-center justify-center rounded-lg bg-green-600' onPress={() =>
          getMyCurrentLocation()}>
          <Text className='text-center text-white tracking-widest'>Current Location</Text>
        </TouchableOpacity>
      </View>

      {
        (cityAddSuccess || cityDeleteSuccess) && (
          <View style={{ position: 'absolute', bottom: 100, left: -5 }} className='rounded-lg bg-green-200 w-[250] h-12 flex justify-center items-center border-2 border-green-600'>
            <Text className='text-green-600 tracking-widest text-xl '>{cityAddSuccessMessage ? cityAddSuccessMessage : cityDeleteMessage}</Text>
          </View>
        )
      }

      {
        (cityAddError || cityDeleteError) && (
          <View style={{ position: 'absolute', bottom: 100, left: -5 }} className='rounded-lg bg-red-200 w-[250] h-12 flex justify-center items-center border-2 border-red-600'>
            <Text className='text-red-600 tracking-widest text-xl'>{cityAddErrorMessage ? cityAddErrorMessage : cityDeleteMessage}</Text>
          </View>
        )
      }

      <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
        <TouchableOpacity onPress={() =>
          handleZoom(true)} style={{ marginBottom: 10 }}>
          <FontAwesome name="search-plus" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleZoom(false)}>
          <FontAwesome name="search-minus" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default HomeScreen;
