import { View, Text, Button, TouchableOpacity,Image } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {FontAwesome} from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

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
        <Marker
          coordinate={{ latitude: 12.9716, longitude: 77.5946 }}
          title="Bangalore"
          description="Silicon Valley of India"
        />
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
