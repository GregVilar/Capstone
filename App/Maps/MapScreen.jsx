import React, { useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapStyle from '../../assets/util/MapStyle.json';
import { UserLocationContext } from './UserLocationContext';
import Markers from './Markers';

export default function MapScreen({ placeList, onMarkerPress }) {
  const { location } = useContext(UserLocationContext);

  return location?.latitude && (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={MapStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0024,
          longitudeDelta: 0.0024,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
        {placeList && placeList.map((item, index) => (
          <Markers key={index} place={item} onMarkerPress={onMarkerPress} /> 
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
