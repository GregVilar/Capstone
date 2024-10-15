import { View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import PlaceItem from './PlaceItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectMarkerContext } from './SelectedMarkerContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth import
import { app } from '../FirebaseConfig';

export default function PlaceListView({ placeList, onMinimize }) {
    const flatListRef = useRef(null);
    const { selectedMarker } = useContext(SelectMarkerContext);
    const [favList, setFavList] = useState([]);
    const [user, setUser] = useState(null); // State for storing the authenticated user

    // Fetch the authenticated user
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return unsubscribe; // Cleanup on component unmount
    }, []);

    const db = getFirestore(app);
    useEffect(() => {
        if (user) {
            getFav();  // Call getFav() only when user is available
        }
    }, [user]);

    // Fetch favorite places for the authenticated user
    const getFav = async () => { 
        if (!user) {
            console.log('No user is authenticated.');
            return;
        }
        setFavList([]);
        const q = query(collection(db, "fav-place"), 
        where("email", "==", user.email)); // Use Firebase user's email

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setFavList(favList => [...favList, doc.data()]);
        });
    };

    const getItemLayout = (_, index) => ({
        length: Dimensions.get('window').width,
        offset: Dimensions.get('window').width * index,
        index,
    });

    const [isMinimized, setIsMinimized] = useState(false); // State to track if minimized

    const toggleMinimize = () => {
        setIsMinimized(prevState => {
            const newState = !prevState; // Toggle minimize state
            if (onMinimize) onMinimize(newState); // Call onMinimize callback
            return newState;
        });
    };

    const isFav = (place) => {
        const result = favList.find(item => item.place.id == place.id);
        return result ? true : false;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.minimizeButton}
                onPress={toggleMinimize}
            >
                <Icon name={isMinimized ? "add-circle" : "remove"} size={20} color="black" />
            </TouchableOpacity>

            {!isMinimized && (
                <FlatList
                    data={placeList}
                    horizontal={true}
                    pagingEnabled
                    ref={flatListRef}
                    getItemLayout={getItemLayout}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <PlaceItem place={item} 
                            isFav={isFav(item)}
                            markedFav={() => getFav()}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()} // Ensure a unique key for each item
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    minimizeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 5,
    },
});
