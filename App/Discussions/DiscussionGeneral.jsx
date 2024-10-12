import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert, Modal, TextInput, FlatList } from 'react-native';
import { db } from '../FirebaseConfig'; // Import the Firestore instance
import { collection, addDoc, onSnapshot, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'; // Firestore methods

const DiscussionGeneral = () => {
  const [discussions, setDiscussions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch discussions from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'discussions'), (snapshot) => {
      const fetchedDiscussions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(fetchedDiscussions);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (title && content) {
      try {
        await addDoc(collection(db, 'discussions'), {
          title,
          content,
          createdAt: serverTimestamp(),
        });
        Alert.alert('Discussion Posted');
        setModalVisible(false);
        setTitle('');
        setContent('');
      } catch (error) {
        Alert.alert('Error', `Error adding discussion: ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Please fill out both fields.');
    }
  };

  const handleDelete = async (id) => {
    console.log('Attempting to delete discussion with id:', id);
    Alert.alert(
      "Delete Discussion",
      "Are you sure you want to delete this discussion?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'discussions', id)); // Correct way to delete
              console.log('Discussion deleted with id:', id);
              Alert.alert('Discussion deleted successfully');
            } catch (error) {
              console.error('Error deleting discussion: ', error);
              Alert.alert('Error', `Failed to delete discussion: ${error.message}`);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.outerContainer}>
      <ImageComponent />
      <View style={styles.container}>
        <Text style={styles.title}>Forum</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>
      <AdditionalContainer discussions={discussions} onDelete={handleDelete} />

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Discussion</Text>
            <TextInput
              placeholder="Enter Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Content"
              value={content}
              onChangeText={setContent}
              style={[styles.input, { height: 100 }]}
              multiline={true}
            />
            <View style={styles.buttonGroup}>
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ImageComponent = () => (
  <Image
    source={require('../../assets/images/DiscussHeader.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ discussions, onDelete }) => (
  <View style={styles.additionalContainer}>
    <Text style={styles.additionalText}>General Discussion</Text>
    <Text style={styles.additionalText1}>Share Experiences and Story</Text>
    <FlatList
      data={discussions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.threadContainer}>
          <Text style={styles.textDiscussHeader}>{item.title}</Text>
          <Text style={styles.textDiscussContent}>{item.content}</Text>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

// Styles
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'tomato',
  },
  image: {
    width: '100%',
    height: 220,
    position: 'absolute',
    bottom: 440,
    zIndex: 1,
  },
  additionalContainer: {
    
    backgroundColor: '#FF5757',
    paddingBottom: 300,
    borderRadius: 30,
    top: 290,
    left: 0,
    right: 0,
    zIndex: 3,
    flex:1,
    
   
  },
  flatListContent: {
    flexGrow: 1,
  },
  additionalText: {
    fontSize: 25,
    marginTop: 30,
    fontWeight: 'bold',
    color: 'white',
   right:-40
  },
  additionalText1: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    right:-40,
    marginBottom:10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  floatingButton: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  threadContainer: {
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: '#FFF7F7',
    padding: 30,
    marginVertical: 10,
    borderRadius: 3,
    width: 300, // or change to 'auto' or fixed width
    height: 'auto', // or any height you want
    overflow: 'visible', // Allow content to overflow if needed
    right:-60,
  },
  textDiscussHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  textDiscussContent: {
    fontSize: 12,
    color: 'black',
  },
});


export default DiscussionGeneral;
