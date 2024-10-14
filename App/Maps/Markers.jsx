import { Marker } from 'react-native-maps';
import React from 'react';

export default function Markers({ place, onMarkerPress }) {
  return place && (
    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}
      onPress={() => onMarkerPress(place)} // Call onMarkerPress with the place data
    />
  );
}
