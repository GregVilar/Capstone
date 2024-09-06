// app.config.js
export default {
    expo: {
      name: "Capstone",
      slug: "your-app-slug",
      version: "1.0.0",
      // other configurations...
      extra: {
        brevoApiKey: process.env.BREVO_API_KEY,
        senderEmail: process.env.SENDER_EMAIL,
      },
    },
  };
  