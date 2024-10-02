import { View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import PlaceItem from './PlaceItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectMarkerContext } from './SelectedMarkerContext';

export default function PlaceListView({ placeList, onMinimize }) {
    const flatListRef = useRef(null);
    const {selectedMarker,setSelecterdMarker}=useContext(SelectMarkerContext)
    useEffect(()=>{
        selectedMarker&&scrollToIndex(selectedMarker)
    },[selectedMarker])

    const scrollToIndex=(index)=>{
        flatListRef.current?.scrollToIndex({animated:true, index})
    }
    const getItemLayout=(_,index)=>({
        length:Dimensions.get('window').width,
        offset:Dimensions.get('window').width*index,
        index
    })
    const [isMinimized, setIsMinimized] = useState(false); // State to track if minimized

    const toggleMinimize = () => {
        setIsMinimized(prevState => {
            const newState = !prevState; // Toggle minimize state
            if (onMinimize) onMinimize(newState); // Call onMinimize callback
            return newState;
        });
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
                    renderItem={({ item, index }) => (
                        <View key={index}>
                            <PlaceItem place={item} />
                        </View>
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
