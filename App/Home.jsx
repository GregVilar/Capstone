import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapScreen from './Maps/MapScreen';
import Header from './Maps/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchBar from './Maps/SearchBar';
import { UserLocationContext } from './Maps/UserLocationContext';
import GlobalApi from '../assets/util/GlobalApi';
import PlaceListView from './Maps/PlaceListView';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectMarkerContext } from './Maps/SelectedMarkerContext';

const Home = () => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [showPlaceList, setShowPlaceList] = useState(false); 
  const [selectedMarker,setSelectedMarker]=useState([]);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["fast_food_restaurant"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 500.0
        }
      }
    };
    GlobalApi.NewNearByPlace(data).then(resp => {
      console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data?.places);
    });
  };

  return (
    <SelectMarkerContext.Provider value={{selectedMarker,setSelectedMarker }}>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
        <SearchBar searchLocation={(location) => 
        setLocation({
          latitude: location.lat,
          longitude: location.lng
        })} />
      </View>
      <MapScreen  placeList={placeList}  />
      
      {!showPlaceList && (
        <TouchableOpacity 
          style={styles.showButton}
          onPress={() => setShowPlaceList(true)} 
        >
          <Icon name="arrow-up" size={30} color="white"/>
        </TouchableOpacity>
      )}


      {showPlaceList && (
        <View style={styles.placeListContainer}>
          <PlaceListView 
            placeList={placeList} 
            onMinimize={() => setShowPlaceList(false)} 
          />
        </View>
      )}
    </View>
    </SelectMarkerContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: wp(100),
    paddingHorizontal: 10,
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: wp(100),
  },
  showButton: {
    position: 'absolute',
    bottom: 60, // Adjust the position as needed
    right: 20, // Adjust the position as needed
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    zIndex: 20,
  },
});

export default Home;