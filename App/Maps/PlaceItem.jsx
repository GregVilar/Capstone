import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GlobalApi from '../../assets/util/GlobalApi';
import { LinearGradient } from 'expo-linear-gradient';


export default function PlaceItem({place} ) {
    const PLACE_PHOTO_BASE_URL="https://places.googleapis.com/v1/"
  return (
    <View
    style={{
        backgroundColor:'white',
        margin: 5,
        borderRadius: 10,
        height: Dimensions.get('screen').height*0.36,
        width: wp(45),
    }}>
        <LinearGradient
        colors={['transparent', '#ffffff']} // Example gradient from transparent to black
        style={{
          borderRadius: 10,
          width: wp(45),
          height: hp(25),
          position: 'absolute', // To overlay on image
          zIndex: 1, // Keep it on top of the image
        }}
      />
      <Image source={
        place?.photos?
        {uri:PLACE_PHOTO_BASE_URL+place?.photos[0]?.name+
        "/media?key="+GlobalApi?.API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
        :require('./../../assets/images/placeholder.jpg')}
      style={{width: wp(45),borderRadius:10, height:hp(25)}}
      />
      <View style={{padding:15, fontSize:23,}}>
        <Text>{place.displayName?.text}</Text>
        <Text style={{
            fontSize: 12,
            color:'gray',
        }}>{place?.shortFormattedAddress}</Text>
      </View>

    </View>
    
  )
}