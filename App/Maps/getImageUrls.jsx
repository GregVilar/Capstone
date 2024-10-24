import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../FirebaseConfig'; // Assuming Firebase is initialized here

const storage = getStorage(app);

export const getImageUrls = async () => {
  try {
    const imageUrls = {};
    const imageNames = ['SM1.png', 'SM2.png', 'SM3.png', 'SM4.png', 'SM5.png', 'SM6.png', 'SM7.png', 'SM8.png', 'SM9.png'];

    // Loop through each image and get its download URL
    for (const imageName of imageNames) {
      const imageRef = ref(storage, `images/smarker/${imageName}`); // Path to the smarker folder
      const url = await getDownloadURL(imageRef); // Get the download URL from Firebase Storage
      imageUrls[imageName] = url; // Store the URL with the image name as the key
    }

    return imageUrls; // Return the object containing the image URLs
  } catch (error) {
    console.error("Error fetching image URLs:", error);
  }
};