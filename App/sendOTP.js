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
          'api-key': '',
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
