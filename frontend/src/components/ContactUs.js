import './contact-us.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customId = 'custom-id-yes';

    try {
      // validate empty fields
      if (
        contact.name === '' ||
        contact.email === '' ||
        contact.message === ''
      ) {
        setError(true);
        toast.error('Please fill in all fields',{
          toastId: customId,
        });
        return;
      }

      setLoading(true);
      const response = await fetch('/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
      setContact({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      toast.success('Thank you for contacting us',{
        toastId: customId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact-us">
      <ToastContainer />
      <h1>Contact Us</h1>

      <div className="contact-us-form">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={contact.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={contact.email}
          onChange={handleChange}
        />
        <textarea
          placeholder="Enter your message"
          value={contact.message}
          name="message"
          onChange={handleChange}
        />
        <button
          type="submit"
          id="contact"
          className="btn"
          onClick={handleSubmit}
        >
          Send
        </button>
        {loading && (
          <p
            style={{
              color: '#1AAC83',
              fontSize: '1rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Sending message...
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
