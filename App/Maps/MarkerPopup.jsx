import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GlobalApi from '../../assets/util/GlobalApi';
import Icon from 'react-native-vector-icons/Ionicons';

const MarkerPopup = ({ visible, onClose, place }) => {
    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
    console.log('MarkerPopup place data:', place);
    const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

    const openRatingModal = () => {
        setIsRatingModalVisible(true);
    };

    const closeRatingModal = () => {
        setIsRatingModalVisible(false);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                {place ? (
                    <>
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
                            style={{ width: wp(90), borderRadius: 10, height: hp(15), marginLeft: -20, marginTop: -20 }}
                        />
                        <Text style={styles.displayName}>{place.displayName?.text}</Text>
                    </>
                ) : (
                    <Text>No data available</Text>
                )}

                <View style={styles.separator} />

                <TouchableOpacity style={styles.rateLocButton} onPress={openRatingModal}>
                    <Text style={styles.buttonText}>Rate Location</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isRatingModalVisible}
                onRequestClose={closeRatingModal}
            >
                <View style={styles.ratingModalContainer}>
                    {place ? (
                        <>
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
                                style={{ width: wp(90), borderTopLeftRadius: 10, borderTopRightRadius: 10, height: hp(15), marginLeft: -20, marginTop: -20 }}
                            />
                            <Text style={styles.displayName}>{place.displayName?.text}</Text>
                        </>
                    ) : (
                        <Text>No data available</Text>
                    )}

                    <View style={styles.separator2} />

                    <Text style={styles.pwd}>PWD Accessible?</Text>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => console.log('WC1 clicked')}>
                            <Image
                                source={require('../../assets/images/WC1.png')}
                                style={styles.WCImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => console.log('WC2 clicked')}>
                            <Image
                                source={require('../../assets/images/WC2.png')}
                                style={styles.WCImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => console.log('WC3 clicked')}>
                            <Image
                                source={require('../../assets/images/WC3.png')}
                                style={styles.WCImage}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => console.log('Help clicked')}>
                            <Text style={styles.help}>Help?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separator3} />

                    <TouchableOpacity style={styles.submitRatingButton} onPress={closeRatingModal}>
                        <Text style={styles.buttonText}>Submit Rating</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('WC3 clicked')}>
                            <Image
                                source={require('../../assets/images/upload.png')}
                                style={styles.uploadImg}
                            />
                        </TouchableOpacity>
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: wp(90),  // Width set to 80% of screen width
        height: hp(60), // Height set to 40% of screen height
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginLeft: wp(5),
        marginTop: hp(20)
    },
    ratingModalContainer: {
        width: wp(90),  // Width set to 80% of screen width
        height: hp(60), // Height set to 40% of screen height
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginLeft: wp(5),
        marginTop: hp(20)
    },
    separator: {
        height: 200,
        width: wp(90),
        marginLeft: wp(-4.5),
        backgroundColor: '#EFEFEF',
        marginVertical: 10,
        marginTop: 50
    },
    separator2: {
        height: 160,
        width: wp(90),
        marginLeft: wp(-4.5),
        backgroundColor: '#EFEFEF',
        marginVertical: 10,
        marginTop: -3
    },
    separator3: {
        height: 180,
        width: wp(90),
        marginLeft: wp(-4.5),
        backgroundColor: '#EFEFEF',
        marginVertical: 10,
        marginTop: 40
    },
    pwd: {
        marginTop: -160,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    uploadImg: {
        height: 75,
        width: 75,
        top:-60,
        left: 30
    },
    help: {
        color: 'black',
        fontWeight: 'bold',
        top: 85,
        right: 20
    },
    rateLocButton: {
        marginTop: 50, // Space above the button
        padding: 10,
        backgroundColor: '#FF5757', // Background color for the rate location button
        borderRadius: 5,
        alignItems: 'center', // Center the button text
        left: wp(20),
        width: wp(40),
    },
    closeModalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#DC3545',
        borderRadius: 5,
        alignItems: 'center',
        left: wp(20),
        width: wp(40),
    },
    submitRatingButton: {
         // Space above the button
        padding: 10,
        backgroundColor: '#FF5757', // Background color for the rate location button
        borderRadius: 5,
        alignItems: 'center', // Center the button text
        left: wp(25),
        width: wp(40),
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    displayName: {
        position: 'absolute',
        bottom: 416,
        fontSize: 16,
        color: 'white',
        fontStyle: 'italic',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderRadius: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    WCImage: {
        width: 75,
        height: 75,
        left: 20,
        marginRight: 40,
    },
});

export default MarkerPopup;
