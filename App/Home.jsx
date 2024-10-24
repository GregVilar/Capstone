import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapScreen from './Maps/MapScreen';
import Header from './Maps/Header';
import SearchBar from './Maps/SearchBar';
import { UserLocationContext } from './Maps/UserLocationContext';
import GlobalApi from '../assets/util/GlobalApi';
import PlaceListView from './Maps/PlaceListView';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectMarkerContext } from './Maps/SelectedMarkerContext';
import MarkerPopup from './Maps/MarkerPopup';
import SpecialMarker from './Maps/SpecialMarker';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, GeoPoint } from 'firebase/firestore';
import { app } from './FirebaseConfig';
import { getAuth } from 'firebase/auth';

const Home = () => {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [showPlaceList, setShowPlaceList] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [specialMarkerVisible, setSpecialMarkerVisible] = useState(false);
  const [specialMarkerLocation, setSpecialMarkerLocation] = useState(null);
  const [specialMarkerImageUrl, setSpecialMarkerImageUrl] = useState(null);
  const db = getFirestore(app);
  const auth = getAuth(); // Get the current auth instance
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    location && GetNearByPlace();
    fetchSpecialMarkerLocation();
  }, [location]);

  useEffect(() => {
    if (specialMarkerLocation) {
      const timer = setTimeout(() => {
        deleteSpecialMarkerLocation();
        setSpecialMarkerLocation(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [specialMarkerLocation]);

  // Callback function to handle saving the special marker data
  const handleSpecialMarkerSave = (location, imageUrl) => {
    setSpecialMarkerLocation(location); // Set the special marker location
    setSpecialMarkerImageUrl(imageUrl); // Set the special marker image URL
  };

  const fetchSpecialMarkerLocation = async () => {
    try {
      const docRef = doc(db, 'specialMarkers', 'current');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSpecialMarkerLocation({
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        });
        setSpecialMarkerImageUrl(data.imageUrl); // Fetch and set the image URL
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching special marker location:', error);
    }
  };

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ['restaurant', 'hospital', 'pharmacy'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 500.0,
        },
      },
    };
    GlobalApi.NewNearByPlace(data).then((resp) => {
      console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data?.places);
    });
  };

  const handleMarkerPress = (place) => {
    setSelectedMarker(place);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedMarker(null);
  };

  const openSpecialMarker = () => {
    setSpecialMarkerVisible(true);
  };

  const closeSpecialMarker = () => {
    setSpecialMarkerVisible(false);
  };

  const deleteSpecialMarkerLocation = async () => {
    try {
      await deleteDoc(doc(db, 'specialMarkers', 'current'));
      console.log('Special marker location deleted from Firestore');
    } catch (error) {
      console.error('Error deleting special marker location:', error);
    }
  };


  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar
            searchLocation={(location) =>
              setLocation({
                latitude: location.lat,
                longitude: location.lng,
              })
            }
          />
        </View>
        <MapScreen
          placeList={placeList}
          onMarkerPress={handleMarkerPress}
          specialMarkerLocation={specialMarkerLocation}
          specialMarkerImageUrl={specialMarkerImageUrl} // Pass the special marker image URL
        />

        {!showPlaceList && (
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => setShowPlaceList(true)}
          >
            <Icon name="arrow-up" size={30} color="white" />
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

        {/* Render the MarkerPopup component */}
        <MarkerPopup
          visible={popupVisible}
          onClose={closePopup}
          place={selectedMarker}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={openSpecialMarker}
        >
          <Icon name="add" size={30} color="white" />
        </TouchableOpacity>

        <SpecialMarker
          visible={specialMarkerVisible}
          onClose={closeSpecialMarker}
          location={location}
          onSave={handleSpecialMarkerSave}
          userId={userId} 
        />

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
    width: '100%',
    paddingHorizontal: 10,
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },
  showButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    zIndex: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 120,  // Position it above the showButton
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 30,
    zIndex: 5,
  },
});

export default Home;
