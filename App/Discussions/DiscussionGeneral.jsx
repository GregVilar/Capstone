import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiscussionGeneral = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.additionalContainer}>
      <Text style={styles.DiscussHeader}>General Discussion</Text>
      <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
      <Button
        title="Go to Landmarks"
        onPress={() => navigation.navigate('DiscussionLandmarks')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  additionalContainer: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    flex: 1,
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

export default DiscussionGeneral;
