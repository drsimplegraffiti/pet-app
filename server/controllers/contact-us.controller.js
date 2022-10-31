const sendEmail = require('../utils/email');

exports.contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const html = `
        <h1>Message from ${name}</h1>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
        <p>From: ${email}</p>
        `;
    await sendEmail({
      email: 'abayomiogunnusi@gmail.com',
      subject: `Contact Us  ${subject}`,
      html,
    });
    res.status(200).json({
      status: 'success',
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
