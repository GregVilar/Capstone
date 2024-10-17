import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';
import { useColorInversion } from './ColorInversionContext';
import { useTranslation } from 'react-i18next';
import { FontSizeContext } from './FontSizeContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TTS = () => {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0.5);
  const [pitch, setPitch] = useState(1);
  const { isInverted } = useColorInversion();
  const { t } = useTranslation();
  const { fontSize } = useContext(FontSizeContext);

  const speak = () => {
    if (!text) {
      Alert.alert(t('tts.error'), t('tts.enterText'));
      return;
    }
    const options = {
      rate: rate,
      pitch: pitch,
    };
    Speech.speak(text, options);
  };

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>{t('tts.title')}</Text>
      </View>

      <View style={[styles.contentContainer, isInverted && styles.invertedContentContainer]}>
        <TextInput
          style={[styles.textInput, { fontSize, backgroundColor: isInverted ? '#000' : '#fff', color: isInverted ? '#fff' : '#000' }]}
          value={text}
          onChangeText={setText}
          placeholder={t('tts.placeholder')}
          placeholderTextColor={isInverted ? '#aaa' : '#888'} // Adjust placeholder color for inverted mode
        />
        <View style={styles.sliderContainer}>
          <Text style={{ fontSize, color: isInverted ? '#fff' : '#000' }}>{t('tts.rate')}: {rate.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={2.0}
            step={0.1}
            value={rate}
            onValueChange={setRate}
            thumbTintColor={isInverted ? '#fff' : '#000'} // Adjust thumb color for inverted mode
            minimumTrackTintColor={isInverted ? '#fff' : '#000'} // Adjust minimum track color for inverted mode
            maximumTrackTintColor={isInverted ? '#888' : '#000'} // Adjust maximum track color for inverted mode
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={{ fontSize, color: isInverted ? '#fff' : '#000' }}>{t('tts.pitch')}: {pitch.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={pitch}
            onValueChange={setPitch}
            thumbTintColor={isInverted ? '#fff' : '#000'} // Adjust thumb color for inverted mode
            minimumTrackTintColor={isInverted ? '#fff' : '#000'} // Adjust minimum track color for inverted mode
            maximumTrackTintColor={isInverted ? '#888' : '#000'} // Adjust maximum track color for inverted mode
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={speak}>
          <Text style={[styles.buttonText, { fontSize }]}>{t('tts.speakButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invertedOuterContainer: {
    backgroundColor: '#000', // Set background color to black in inverted mode
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b',
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
    position: 'relative',
    padding: 20,
    width: '100%',
  },
  invertedContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#fff',
    width: '100%',
  },
  invertedContentContainer: {
    backgroundColor: '#000', // Set content background color to black in inverted mode
  },
  textInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  sliderContainer: {
    width: '90%',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
  button: {
    backgroundColor: '#185c6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TTS;
