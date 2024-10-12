// app.config.js
export default {
  expo: {
    name: "Capstone",
    slug: "capstone", // Update with your actual slug
    version: "1.0.0",
    android: {
      package: "com.yourcompany.capstone", // Update with your desired package name
    },
    ios: {
      bundleIdentifier: "com.yourcompany.capstone", // Update for iOS if needed
    },
    extra: {
      brevoApiKey: process.env.BREVO_API_KEY,
      senderEmail: process.env.SENDER_EMAIL,
    },
    // Add any other necessary configurations here
  },
};
