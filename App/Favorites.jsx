import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getFirestore, query, collection, where, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { app } from "./FirebaseConfig";
import { FlatList } from 'react-native-gesture-handler';
import PlaceItem from './Maps/PlaceItem';

export default function Favorites() {
  const [user, setUser] = useState(null);
  const [favList, setFavList] = useState([]);
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true); // Start loading as true

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user or null directly
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (user) {
      // Listen for real-time updates in the fav-place collection for the authenticated user
      const q = query(collection(db, "fav-place"), where("email", "==", user.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const favorites = [];
        querySnapshot.forEach((doc) => {
          favorites.push(doc.data());
        });
        setFavList(favorites);
        setLoading(false); // Stop loading after fetching
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    } else {
      setLoading(false); // Stop loading if no user
    }
  }, [user, db]); // Re-run this effect if user or db changes

  return (
    <View style={styles.container}>
      {loading ? ( // Show loader when loading
        <ActivityIndicator size={'large'} color='green' />
      ) : favList.length === 0 ? (
        <Text>No favorites found</Text>
      ) : (
        <FlatList
          data={favList}
          onRefresh={() => setLoading(true)} // Optional: Set loading to true on manual refresh
          refreshing={loading}
          renderItem={({ item }) => (
            <PlaceItem place={item.place} isFav={true} markedFav={() => {}} />
          )}
          keyExtractor={(item, index) => index.toString()} // Add a key extractor if needed
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'outfit-regular',
    color: '#555',
  },
});
