import { View, Text } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar({searchLocation}) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 15,
            paddingHorizontal: 5,
            backgroundColor: 'white',
            borderRadius: 6,
        }}>
            <Icon name="location-sharp" size={24} color={'Gray'} style={{ paddingTop: 10 }} />
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    searchLocation(details?.geometry?.location)
                }}
                query={{
                    key: 'API_KEY',
                    language: 'en',
                }}
            />
        </View>
    );
}
