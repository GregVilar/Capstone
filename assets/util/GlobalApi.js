import axios from "axios";

const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY="";

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':"",
        'X-Goog-FieldMask':['places.displayName',
            'places.formattedAddress',
            'places.location',
            'places.photos',
            'places.shortFormattedAddress',
            'places.id']
    }
} 

const NewNearByPlace=(data)=>axios.post(BASE_URL,data,config);

export default {
    NewNearByPlace,
    API_KEY,
}