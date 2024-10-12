import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';

export default function TTS() {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0.5);
  const [pitch, setPitch] = useState(1);

  const speak = () => {
    if (!text) {
      Alert.alert('Error', 'Please enter text to speak.');
      return;
    }
    const options = {
      rate: rate,
      pitch: pitch,
    };
    Speech.speak(text, options);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Enter text to speak"
      />
      <View style={styles.sliderContainer}>
        <Text>Rate: {rate.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={2.0}
          step={0.1}
          value={rate}
          onValueChange={setRate}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text>Pitch: {pitch.toFixed(1)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          value={pitch}
          onValueChange={setPitch}
        />
      </View>
      <Button title="Speak" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  },
});
