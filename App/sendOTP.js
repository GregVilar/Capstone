import axios from 'axios';

const sendOTP = async (email, otp) => {
  const brevoAPIKey = process.env.BREVO_API_KEY || 'YOUR_BREVO_API_KEY'; // Ensure your API key is set
  const senderEmail = 'mynameisjohnsabog@gmail.com'; // Replace with your sender email
  const templateId = 1; // Replace with your Brevo template ID

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: senderEmail, name: "PWDaan" }, // Customize sender info
        to: [{ email }], // Recipient email
        templateId: templateId, // Use the Brevo template ID
        params: {
          otp_code: otp, // Dynamic OTP code to replace in the template
        }
      },
      {
        headers: {
          'api-key': '',
          'Content-Type': 'application/json',
        }
      }
    );
    console.log('OTP sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending OTP:', error.response ? error.response.data : error.message);
  }
};

export default sendOTP;
