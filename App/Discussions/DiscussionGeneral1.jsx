import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiscussionGeneral1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.DiscussHeader}>General Discussion 1</Text>
      <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
      <Button
        title="Go to Landmarks 1"
        onPress={() => navigation.navigate('DiscussionLandmarks1')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    flex: 1,
    paddingHorizontal: 20,
  },
  DiscussHeader: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  DiscussSubHeader: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DiscussionGeneral1;
