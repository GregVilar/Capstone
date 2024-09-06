import axios from 'axios'; // Correct import statement

const sendOTP = async (email, otp) => {
  const brevoAPIKey = process.env.BREVO_API_KEY; // Ensure this environment variable is set
  const senderEmail = 'mynameisjohnsabog@gmail.com'; // Replace with your sender email
  
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: senderEmail, name: "PWDaan" },
        to: [{ email }],
        subject: "Your OTP Code",
        htmlContent: `<html><body><p>Your OTP code is: <strong>${otp}</strong></p><br><p>Kindly Enter the OTP code to register your email</p></body></html>`
      },
      {
        headers: {
          'api-key': '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',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('OTP sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending OTP:', error.response ? error.response.data : error.message);
  }
};

export default sendOTP;
