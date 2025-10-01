import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';


type City = {
  _id: string;
  cityName: string;
  country: string;
  lat: number;
  lng: number;
  notes: string;
  visitedOn: string;
};

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [cityData, setCityData] = useState<City[]>([]);

  const fetchCitiesList = async () => {
    console.log("This is called");
    try {
      const res = await fetch("https://travel-buddy-r69f.onrender.com/api/v1/cities/68d796507093fbbb7d7f3965");

      if (!res.ok) {
        throw new Error("Response was not ok");
      }

      const data = await res.json();
      console.log("The data is: ", data);
      console.log("City list is: ", data.data.visitedCities);
      setCityData(data.data.visitedCities);
      data.data.visitedCities.map((c) => (
        console.log(c.cityName),
        console.log(c.lat),
        console.log(c.lng)
      ))
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchCitiesList();
  }, []);



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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {cityData && cityData.length > 0 && cityData.map((c) => {
          return (
            <>
              <Marker
                coordinate={{ latitude: c.lat, longitude: c.lng }}
                title={c.cityName}
                description="Silicon Valley of India"
              />
            </>
          )
        })}

      </MapView>

      <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
        <TouchableOpacity onPress={() => handleZoom(true)} style={{ marginBottom: 10 }}>
          <FontAwesome name="search-plus" size={40} color="black" />
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity onPress={() => handleZoom(false)}>
          <FontAwesome name="search-minus" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
