const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.verifyOtp = functions.https.onCall(async (data, context) => {
  const {email, otp} = data;

  try {
    // Fetch OTP from Firestore
    const otpDoc = await db.collection("otp").doc(email).get();
    if (!otpDoc.exists) {
      throw new functions.https.HttpsError("not-found", "OTP not found");
    }

    const storedOtp = otpDoc.data().otp;
    if (storedOtp !== otp) {
      throw new functions.https.HttpsError("invalid-argument", "Invalid OTP");
    }

    // OTP verified, delete it from the database
    await otpDoc.ref.delete();

    return {success: true};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});
