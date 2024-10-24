import { View, Text, Image, Dimensions, Pressable, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GlobalApi from '../../assets/util/GlobalApi';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { app } from '../FirebaseConfig';
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const db = getFirestore(app);
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  // Function to add a place to favorites
  const onSetFav = async () => {
    if (!user) {
      ToastAndroid.show('User not authenticated', ToastAndroid.TOP);
      return;
    }

    try {
      await setDoc(doc(db, "fav-place", place.id.toString()), {
        place: place,
        email: user.email,
      });
      markedFav(); // Call to update the favorite state in parent component
      ToastAndroid.show('Fav Added!', ToastAndroid.TOP);
    } catch (error) {
      console.error("Error adding favorite:", error);
      ToastAndroid.show('Failed to add favorite', ToastAndroid.TOP);
    }
  };

  // Function to remove a place from favorites
  const onRemoveFav = async () => {
    if (!user) {
      ToastAndroid.show('User not authenticated', ToastAndroid.TOP);
      return;
    }

    try {
      await deleteDoc(doc(db, "fav-place", place.id.toString()));
      markedFav(); // Call to update the favorite state in parent component
      ToastAndroid.show('Fav Removed!', ToastAndroid.TOP);
    } catch (error) {
      console.error("Error removing favorite:", error);
      ToastAndroid.show('Failed to remove favorite', ToastAndroid.TOP);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        height: Dimensions.get('screen').height * 0.36,
        width: wp(92.89),
      }}>
      <LinearGradient
        colors={['transparent', '#ffffff']} // Example gradient from transparent to white
        style={{
          borderRadius: 10,
          width: wp(92.89),
          height: hp(25),
          position: 'absolute', // Overlay on image
          zIndex: 1, // Keep it on top of the image
        }}
      />

      <Pressable
        style={{ position: 'absolute', left: 0, margin: 5, zIndex: 2 }}
        onPress={isFav ? onRemoveFav : onSetFav}>
        <Ionicons name={isFav ? "heart-sharp" : "heart-outline"} size={30} color={isFav ? "red" : "black"} />
      </Pressable>

      {/* Image of the place */}
      <Image
        source={
          place?.photos
            ? {
                uri:
                  PLACE_PHOTO_BASE_URL +
                  place?.photos[0]?.name +
                  "/media?key=" +
                  GlobalApi?.API_KEY +
                  "&maxHeightPx=800&maxWidthPx=1200",
              }
            : require('./../../assets/images/placeholder.jpg')
        }
        style={{ width: wp(92.89), borderRadius: 10, height: hp(25) }}
      />

      {/* Place information */}
      <View style={{ padding: 15, fontSize: 23 }}>
        <Text>{place.displayName?.text || "No name available"}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>
          {place?.shortFormattedAddress || "No address available"}
        </Text>
      </View>
    </View>
  );
}
