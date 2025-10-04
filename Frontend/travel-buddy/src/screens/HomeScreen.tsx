import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from "expo-location";
import DetailsSubmitForm from "../components/DetailsSubmitForm";
import DetailsDeleteForm from "../components/DetailsDeleteForm";
import Spinner from '../components/Spinner';

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
  // Data of the user after successfull login
  const { userData } = route.params;

  // State that defines the initial region of the map
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Loading state for city delete
  const [deleteCityLoading, setDeleteCityLoading] = useState(false);

  // State to toggle delete city form display
  const [deleteCityForm, setDeleteCityForm] = useState(false);

  // Loading state for city add
  const [addCityLoading, setAddCityLoading] = useState(false);

  // State to toggle add city form display
  const [addCityForm, setAddCityForm] = useState(false);

  // State that stores the country of the selected marker
  const [selectedCountry, setSelectedCountry] = useState();

  // State that stores the id of the logged in  user
  const [userId, setUserId] = useState();

  // State that stores the visitedCities of the logged in user
  const [cityData, setCityData] = useState<City[]>([]);

  // State that contains the name of the visited city
  const [currentCity, setCurrentCity] = useState("");

  // State that contains the description of the visited city
  const [currentDescription, setCurrentDescription] = useState("");

  // State that contains the name of the new selected city
  const [selectedCity, setSelectedCity] = useState("");

  const [selectedCityId, setSelectedCityId] = useState("");

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    setUserId(userData.user._id);
  }, [userData]);

  useEffect(() => {
    if (userId) {
      fetchCitiesList();
    }
  }, [userId]);

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

  // Function that fetch data of the visitedCities according to userId
  const fetchCitiesList = async () => {
    console.log("This is called");
    try {
      const res = await fetch(`https://travel-buddy-r69f.onrender.com/api/v1/cities/${userId}`);

      if (!res.ok) {
        throw new Error("Response was not ok");
      }

      const data = await res.json();
      console.log("The data is: ", data);
      console.log("City list is: ", data.data.visitedCities);
      setCityData(data.data.visitedCities);
    } catch (err) {
      console.log("The response should be ", err);
    }
  }

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

  return (
    <View style={{ flex: 1 }} >
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        onPress={handleMapPress}
      >
        {cityData && cityData.length > 0 && cityData.map((c) => {
          return (
            <>
              <Marker
                coordinate={{ latitude: c.lat, longitude: c.lng }}
                title={c.cityName}
                description={c.notes}
                key={c._id}
                onPress={() => handleMarkerPress(c)}
              />
            </>
          )
        })}
        {addCityForm && markerCoordinates && <Marker coordinate={markerCoordinates} />}


      </MapView>
      {addCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsSubmitForm markerCoordinates={markerCoordinates} selectedCity={selectedCity} userId={userId} selectedCityId={selectedCityId} selectedCountry={selectedCountry} fetchCitiesList={fetchCitiesList} addCityLoading={addCityLoading} addCityForm={addCityForm} setAddCityLoading={setAddCityLoading} setAddCityForm={setAddCityForm} success={success} setSuccess={setSuccess} error={error} setError={setError} />
        </View>
      )}

      {deleteCityForm && (
        <View style={{ position: 'absolute', top: 75, left: 0, right: 10, alignItems: 'center' }} className='w-[80%] flex items-center justify-center'>
          <DetailsDeleteForm markerCoordinates={markerCoordinates} currentCity={currentCity} userId={userId} selectedCityId={selectedCityId} selectedCountry={selectedCountry} currentDescription={currentDescription} deleteCityLoading={deleteCityLoading} deleteCityForm={deleteCityForm} setDeleteCityLoading={setDeleteCityLoading} setDeleteCityForm={setDeleteCityForm} fetchCitiesList={fetchCitiesList} success={success} setSuccess={setSuccess} error={error} setError={setError} />
        </View>
      )}

      {success && (
        <View style={{ position: 'absolute', bottom: 50, left: -5 }} className='rounded-lg bg-green-200 w-[200] h-12 flex justify-center items-center border-2 border-green-600'>
          <Text className='text-green-600 tracking-widest text-2xl '>Success</Text>
        </View>
      )}

      {error && (
        <View style={{ position: 'absolute', bottom: 50, left: -5 }} className='rounded-lg bg-red-200 w-[200] h-12 flex justify-center items-center border-2 border-red-600'>
          <Text className='text-red-600 tracking-widest text-2xl'>Error</Text>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
        <TouchableOpacity onPress={() => handleZoom(true)} style={{ marginBottom: 10 }}>
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
