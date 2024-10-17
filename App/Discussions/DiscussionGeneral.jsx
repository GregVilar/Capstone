import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert, Modal, TextInput, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { db } from '../FirebaseConfig'; // Import your Firebase config
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, addDoc, onSnapshot, serverTimestamp, doc, deleteDoc, updateDoc, query, where, getDocs, getDoc  } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Icons from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/FontAwesome5';
import More from'react-native-vector-icons/Feather';
import Like from 'react-native-vector-icons/AntDesign';


const POSTS_PER_MONTH_LIMIT = 10;

const DiscussionGeneral = () => {
  const [discussions, setDiscussions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullViewModalVisible, setFullViewModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); // Store current user's ID
  const auth = getAuth(); // Initialize Firebase Auth
  const [showOptions, setShowOptions] = useState(false); // New state for options visibility
  const [likesCount, setLikesCount] = useState(0); // Initialize to 0
  const [likedBy, setLikedBy] = useState([]); // Initialize to empty array
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [expandedComments, setExpandedComments] = useState({});




  useEffect(() => {
    const unsubscribe =   auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
        
        // Fetch discussions only after user is authenticated
        const unsubscribeDiscussions = onSnapshot(collection(db, 'discussions'), (snapshot) => {
          const fetchedDiscussions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDiscussions(fetchedDiscussions);
        });
  
        return () => unsubscribeDiscussions();
      } else {
        setCurrentUserId(null);
      }
    });
  
    return () => unsubscribe();
  }, []);

  
 // Update likesCount and likedBy when selectedDiscussion changes
 useEffect(() => {
  if (selectedDiscussion) {
    setLikesCount(selectedDiscussion.likesCount || 0);
    setLikedBy(selectedDiscussion.likedBy || []);
  } else {
    // Reset likesCount and likedBy when there's no selected discussion
    setLikesCount(0);
    setLikedBy([]);
  }
}, [selectedDiscussion]);

useEffect(() => {
  if (selectedDiscussion) {
    const unsubscribeComments = onSnapshot(
      collection(db, 'discussions', selectedDiscussion.id, 'comments'),
      (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      }
    );
    return () => unsubscribeComments(); // Cleanup on unmount or when selectedDiscussion changes
  }
}, [selectedDiscussion]);

  const handleSubmit = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }
  
    if (!currentUserId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }
  
    try {
      // Get the start of the current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
  
      // Query to count posts for the current user in the current month
      const userPostsQuery = query(
        collection(db, 'discussions'),
        where('userId', '==', currentUserId),
        where('createdAt', '>=', startOfMonth)
      );
  
      const userPostsSnapshot = await getDocs(userPostsQuery);
      const postsThisMonth = userPostsSnapshot.size;
  
      if (postsThisMonth >= POSTS_PER_MONTH_LIMIT) {
        Alert.alert(
          'Limit Reached',
          `You have reached the limit of ${POSTS_PER_MONTH_LIMIT} posts this month.`
        );
        return;
      }
  
      // Retrieve user profile (including username)
      const userDocRef = doc(db, 'users', currentUserId); // Assuming the user profile is stored in a 'users' collection
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        Alert.alert('Error', 'User profile not found.');
        return;
      }
  
      const userData = userDoc.data();
      const username = userData.username || 'Anonymous'; // Fallback to 'Anonymous' if username not available
  
      // Create the new discussion
      await addDoc(collection(db, 'discussions'), {
        title,
        content,
        createdAt: serverTimestamp(),
        userId: currentUserId, // Store the current user ID
        username, // Store the current user's username
        likesCount: 0, // Initialize likes count
  likedBy: [], // Initialize likedBy as an empty array
      });
  
      Alert.alert('Discussion Posted');
      setModalVisible(false);
      setTitle('');
      setContent('');
  
    } catch (error) {
      console.error('Error adding discussion:', error);
      Alert.alert('Error', `Error adding discussion: ${error.message}`);
    }
  };

  const handleDelete = (id, postUserId) => {
    if (!currentUserId) {
      Alert.alert("Error", "You must be logged in to delete a post.");
      return;
    }

    if (currentUserId !== postUserId) {
      Alert.alert("Unauthorized", "You can only delete your own posts.");
      return;
    }

    Alert.alert(
      "Delete Discussion",
      "Are you sure you want to delete this discussion?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteDoc(doc(db, 'discussions', id))
              .then(() => {
                Alert.alert('Discussion deleted successfully');
              })
              .catch(error => {
                Alert.alert('Error', `Failed to delete discussion: ${error.message}`);
              });
          },
          style: "destructive",
        },
      ]
    );
    setShowOptions(false);

  };


  // Open the create discussion modal and reset title/content
  const openCreateDiscussionModal = () => {
    setTitle(''); // Clear title when opening the create modal
    setContent(''); // Clear content when opening the create modal
    setModalVisible(true); // Open create modal
  };

  const handleDiscussionPress = (discussion) => {
    setSelectedDiscussion(discussion);
    setEditTitle(discussion.title); // Pre-fill title for editing
    setEditContent(discussion.content); // Pre-fill content for editing
    setFullViewModalVisible(true);
    setEditMode(false); // Reset to view mode
    setShowOptions(false); // Reset when opening the modal

  };

  const handleEdit = () => {
    if (!currentUserId) {
      Alert.alert("Error", "You must be logged in to edit a post.");
      return;
    }

    if (currentUserId !== selectedDiscussion.userId) {
      Alert.alert("Unauthorized", "You can only edit your own posts.");
      return;
    }

    setEditMode(true); // Enable edit mode
    setShowOptions(false);

  };

  const handleSaveEdit = async () => {
    if (selectedDiscussion && editTitle && editContent) {
      try {
        await updateDoc(doc(db, 'discussions', selectedDiscussion.id), {
          title:editTitle,
          content:editContent,
          updatedAt: serverTimestamp(),
        });
        Alert.alert('Discussion Updated');
        setFullViewModalVisible(false);
      } catch (error) {
        Alert.alert('Error', `Failed to update discussion: ${error.message}`);
      }
    } else {
      Alert.alert('Error', 'Please fill out both fields.');
    }
  };

  const handleLike = async () => {
    if (!currentUserId) {
      Alert.alert("Error", "You must be logged in to like a post.");
      return;
    }

    let updatedLikedBy = [...likedBy];
    let updatedLikesCount = likesCount;

    // Check if the user already liked the post
    if (likedBy.includes(currentUserId)) {
      // User wants to unlike
      updatedLikedBy = updatedLikedBy.filter(userId => userId !== currentUserId);
      updatedLikesCount--;
    } else {
      // User wants to like
      updatedLikedBy.push(currentUserId);
      updatedLikesCount++;
    }

    // Update the likes count in Firestore
    try {
      await updateDoc(doc(db, 'discussions', selectedDiscussion.id), {
        likesCount: updatedLikesCount,
        likedBy: updatedLikedBy,
      });

      // Update local state
      setLikesCount(updatedLikesCount);
      setLikedBy(updatedLikedBy);
    } catch (error) {
      Alert.alert('Error', `Failed to update likes: ${error.message}`);
    }
  };

// New function to submit a comment
const handleSubmitComment = async () => {
  if (!comment.trim()) {
    Alert.alert('Error', 'Please enter a comment.');
    return;
  }

  if (!currentUserId) {
    Alert.alert('Error', 'You must be logged in to comment.');
    return;
  }

  try {
    // Retrieve user profile (including username)
    const userDocRef = doc(db, 'users', currentUserId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      Alert.alert('Error', 'User profile not found.');
      return;
    }

    const userData = userDoc.data();
    const username = userData.username || 'Anonymous';

    // Add comment to Firestore
    await addDoc(collection(db, 'discussions', selectedDiscussion.id, 'comments'), {
      text: comment,
      createdAt: serverTimestamp(),
      userId: currentUserId,
      username: username,
      likesCount: 0,
      likedBy: [],
    });

    setComment(''); // Clear the comment input
  } catch (error) {
    Alert.alert('Error', `Error adding comment: ${error.message}`);
  }
};

// Function to like/unlike a comment
const handleLikeComment = async (commentId, commentLikesCount, commentLikedBy) => {
  if (!currentUserId) {
    Alert.alert('Error', 'You must be logged in to like a comment.');
    return;
  }

  let updatedLikedBy = [...commentLikedBy];
  let updatedLikesCount = commentLikesCount;

  if (updatedLikedBy.includes(currentUserId)) {
    // Unlike
    updatedLikedBy = updatedLikedBy.filter(userId => userId !== currentUserId);
    updatedLikesCount--;
  } else {
    // Like
    updatedLikedBy.push(currentUserId);
    updatedLikesCount++;
  }

  try {
    await updateDoc(doc(db, 'discussions', selectedDiscussion.id, 'comments', commentId), {
      likesCount: updatedLikesCount,
      likedBy: updatedLikedBy,
    });
  } catch (error) {
    Alert.alert('Error', `Failed to update comment like: ${error.message}`);
  }
};

// Function to toggle "View More" for comments
const toggleExpandComment = (commentId) => {
  setExpandedComments(prevState => ({
    ...prevState,
    [commentId]: !prevState[commentId]
  }));
};



  return (
    <View style={styles.outerContainer}>
      <ImageComponent />
      <View style={styles.container}>
        <Text style={styles.title}>Forum</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>
      <AdditionalContainer discussions={discussions} onDelete={handleDelete} onDiscussionPress={handleDiscussionPress} />

      {/* Button for creating new discussion */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for creating a discussion */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Discussion</Text>

            <TextInput
              placeholder="Enter Title"
              value={title}
              maxLength={50}
              onChangeText={setTitle}
              style={styles.input}
            />

            <TextInput
              placeholder="Enter Content"
              value={content}
              onChangeText={setContent}
              maxLength={255}
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

   
{/* Modal for full discussion view */}
<Modal 
  animationType="slide" 
  transparent={true} 
  visible={fullViewModalVisible} 
  onRequestClose={() => setFullViewModalVisible(false)}
>
  {/* Close modal when tapping outside */}
  <TouchableWithoutFeedback onPress={() => setFullViewModalVisible(false)}>
    <View style={styles.fullViewModalContainer}>
      <View style={styles.modalBackground} />
    </View>
  </TouchableWithoutFeedback>

  <View style={styles.fullViewContent}>
    <View style={styles.threadContainerModal}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
      >
        {selectedDiscussion && !editMode ? (
          <>
            {/* Discussion Content */}
            <Text style={styles.fullViewTitle}>{selectedDiscussion.title}</Text>
            <Text style={styles.fullViewContentText}>{selectedDiscussion.content}</Text>

            {/* Like System */}
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
                <Like 
                  name={likedBy.includes(currentUserId) ? 'heart' : 'hearto'} 
                  size={24} 
                  color={likedBy.includes(currentUserId) ? 'red' : 'black'} 
                />
              </TouchableOpacity>
              <Text>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</Text>
            </View>

            {/* Show the 3-dot icon and dropdown menu if the current user is the owner */}
            {auth.currentUser.uid === selectedDiscussion.userId && (
              <View style={styles.optionsContainer}>
                <More name="more-horizontal" size={36} onPress={() => setShowOptions(!showOptions)} />
                {showOptions && (
                  <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={() => { setEditMode(true); setShowOptions(false); }}>
                      <Edit name="edit" style={styles.edtbutton} />
                      <Text style={styles.dropdownMenuItemText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(selectedDiscussion.id, selectedDiscussion.userId)}>
                      <Icons name="delete" style={styles.deleteButtonText} />
                      <Text style={styles.dropdownMenuItemText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* Comment Section */}
            <View style={styles.commentSection}>
              {/* Comment Input */}
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Write a comment..."
                maxLength={255}
                style={styles.commentInput}
                multiline={true}
              />
              <TouchableOpacity onPress={handleSubmitComment} style={styles.submitCommentButton}>
                <Text style={styles.submitCommentButtonText}>Submit Comment</Text>
              </TouchableOpacity>

              {/* Display Comments */}
              <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  const isCommentExpanded = expandedComments[item.id];
                  const commentText = isCommentExpanded || item.text.length <= 100
                    ? item.text
                    : item.text.slice(0, 100) + '...';

                  return (
                    <View style={styles.commentContainer}>
                      <Text style={styles.commentUsername}>{item.username}</Text>
                      <Text style={styles.commentText}>
                        {commentText}
                        {item.text.length > 100 && (
                          <Text
                            onPress={() => toggleExpandComment(item.id)}
                            style={styles.viewMoreText}
                          >
                            {isCommentExpanded ? ' View Less' : ' View More'}
                          </Text>
                        )}
                      </Text>

                      {/* Comment Like System */}
                      <View style={styles.commentLikeContainer}>
                        <TouchableOpacity onPress={() => handleLikeComment(item.id, item.likesCount, item.likedBy)}>
                          <Like
                            name={item.likedBy.includes(currentUserId) ? 'heart' : 'hearto'}
                            size={20}
                            color={item.likedBy.includes(currentUserId) ? 'red' : 'black'}
                          />
                        </TouchableOpacity>
                        <Text style={styles.commentLikesText}>{item.likesCount} {item.likesCount === 1 ? 'Like' : 'Likes'}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </>
        ) : (
          <>
            {/* Edit Mode */}
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
              placeholder="Edit Title"
            />
            <TextInput
              value={editContent}
              onChangeText={setEditContent}
              style={[styles.input, { height: 100 }]}
              placeholder="Edit Content"
              multiline={true}
            />
            <View style={styles.buttonGroup}>
              <Button title="Save" onPress={handleSaveEdit} />
              <Button title="Cancel" color="red" onPress={() => setEditMode(false)} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  </View>
</Modal>

    </View>
  );
};

const ImageComponent = () => (
  <Image source={require('../../assets/images/DiscussHeader.png')} style={styles.image} />
);

const AdditionalContainer = ({ discussions, onDiscussionPress, currentUserId }) => (
  <View style={styles.additionalContainer}>
    <Text style={styles.additionalText}>General Discussion</Text>
    <Text style={styles.additionalText1}>Share Experiences and Story</Text>
    <FlatList
      data={discussions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const isOwner = currentUserId === item.userId; // Check if the current user owns this post
        const createdAt = item.createdAt?.toDate();
        const formattedDate = createdAt ? createdAt.toLocaleString() : "Unknown";

    
        return (
          <View style={styles.threadContainer}>
            <TouchableOpacity onPress={() => onDiscussionPress(item)} style={styles.discussionItem}>
              <Text style={styles.textDiscussHeader}>{item.title}</Text>
              <Text style={styles.textDiscussUsername}>Posted by: {item.username}</Text>
              <Text style={styles.textDiscussDate}>Posted on: {formattedDate}</Text>
            </TouchableOpacity>

           
          </View>
        );
      }}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  </View>
);



// Styles
const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 10, // Space around the scrollable content
  },

  commentSection: {
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  submitCommentButton: {
    backgroundColor: '#185c6b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitCommentButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  commentContainer: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 5,
  },
  viewMoreText: {
    color: 'blue',
  },
  commentLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikesText: {
    marginLeft: 5,
  },
  
  fullViewModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  dropdownMenuItemText: {
    color: 'black', // White text
    marginBottom:20,
    fontSize: 12,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: '00FFFFFF',
    paddingTop:20,
    borderRadius: 8, 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  optionsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Greyed area
  },
  textDiscussDate: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  fullViewContent: {
    width: wp('100%'),
    height: hp('60%'),
    backgroundColor: '#FF5757',
    borderRadius: 20,
    padding: 30,
    marginBottom:50,
    marginLeft:0,
    
  },
  fullViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fullViewContentText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: wp('20%'),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

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
  edtbutton: {
    
    left:2,
    fontSize: wp('5.5'),          

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
    width: wp('100%'),
    height: hp('20%'),
    position: 'absolute',
    bottom: 500,
    zIndex: 1,
  },
  additionalContainer: {
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: '#FF5757',
    paddingBottom: 300,
    borderRadius: 30,
    top: 220,
    left: 0,
    right: 0,
    zIndex: 3,
    flex:1,
    
  },
 
  deleteButtonText: {
    fontSize: wp('6.5'),          
     
    left:0
   
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
    width: wp('10%'),
    height: hp('5%'),
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
    width: wp('90%'),
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
    width: wp('70%'), 
    height: hp('15%'), 
    overflow: 'visible', 
    right:-60,
  },
  threadContainerModal: {
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: '#FFF7F7',
    padding: 20,
    borderRadius: 2,
    width: wp('85%'), 
    height: hp('35%'), 
    overflow: 'visible', 
    marginBottom:20,
  },
  threadContainerModalComments: {
    justifyContent:"center",
    alignContent:"center",
    backgroundColor: '#FFF7F7',
    padding: 20,
    borderRadius: 2,
    width: wp('85%'), 
    height: hp('15%'), 
    overflow: 'visible', 
  },
  
  textDiscussHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  textDiscussContent: {
    fontSize: 12,
    color: 'black',
  },
});


export default DiscussionGeneral;
