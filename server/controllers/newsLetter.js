const sendEmail = require('../utils/email');

exports.subscribeNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    const html = `
        <h1>Thank you for subscribing to our newsletter</h1>
        <p>You will be receiving updates from us</p>
        `;
    await sendEmail({
      email: email,
      subject: `Thank you for subscribing to our newsletter`,
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
