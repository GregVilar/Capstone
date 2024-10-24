import React, { useContext, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapStyle from '../../assets/util/MapStyle.json';
import { UserLocationContext } from './UserLocationContext';
import Markers from './Markers';
import CustomMarker from './CustomMarker';

export default function MapScreen({ placeList, onMarkerPress, specialMarkerLocation, specialMarkerImageUrl }) {
  const { location } = useContext(UserLocationContext);

  useEffect(() => {
    console.log('Special Marker Location:', specialMarkerLocation);
    console.log('Special Marker Image URL:', specialMarkerImageUrl);
  }, [specialMarkerLocation, specialMarkerImageUrl]);

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
            image={require('../../assets/images/markUser.png')} // User location marker image
          />
        )}

        {specialMarkerLocation && specialMarkerImageUrl && (
          <Marker
            coordinate={{
              latitude: specialMarkerLocation.latitude,
              longitude: specialMarkerLocation.longitude,
            }}
          // Use the CustomMarker component to render the special marker image
          >
            <CustomMarker imageUrl={specialMarkerImageUrl} />
          </Marker>
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
