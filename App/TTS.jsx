import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Tts from 'react-native-tts'; // Import TTS library
import SliderComponent from '@react-native-community/slider'; // Import Slider

const TTS = () => {
  const [text, setText] = useState('');
  const [rate, setRate] = useState(0.5); // Default speech rate
  const [isTtsReady, setIsTtsReady] = useState(false);

  // Initialize TTS settings
  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        // TTS is initialized and ready
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(rate);
        setIsTtsReady(true);
      })
      .catch(err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
  }, [rate]);

  const speakText = () => {
    if (isTtsReady) {
      Tts.stop(); // Stop any ongoing TTS
      Tts.speak(text); // Speak the input text
    } else {
      console.log('TTS is not ready yet.');
    }
  };

  const handleRateChange = (value) => {
    setRate(value);
    if (isTtsReady) {
      Tts.setDefaultRate(value); // Update the speech rate only if TTS is ready
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text-to-Speech</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text to speak"
        value={text}
        onChangeText={setText}
      />

      <Button title="Speak" onPress={speakText} />

      <Text style={styles.subtitle}>Adjust Speech Rate</Text>
      <SliderComponent
        style={styles.slider}
        minimumValue={0.1}
        maximumValue={1.0}
        value={rate}
        onValueChange={handleRateChange}
      />

      <Text>Speech Rate: {rate.toFixed(2)}</Text>
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
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  slider: {
    width: '90%',
    height: 40,
    marginTop: 20,
  },
});

export default TTS;
