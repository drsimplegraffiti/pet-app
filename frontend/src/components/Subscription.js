import './subscription.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subscription = () => {
  const [subscription, setSubscription] = useState({
    email: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var customId = 'custom-id-yes';
    try {
      // validate empty fields
      if (subscription.email === '') {
        setError(true);
        toast.error('Please fill in your email', {
          toastId: customId,
        });
        return;
      }
      setLoading(true);
      const response = await fetch('/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      const data = await response.json();
      setLoading(false);
      setSubscription({
        email: '',
      });
      toast.success('Thank you for subscribing to our newsletter', {
        toastId: customId,
      });

      if (data.status === 'error') {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //    subscription
    <div className="subscription">
      <ToastContainer />
      <h1>Subscribe to our newsletter</h1>
      <p>Get the latest news and updates</p>
      <div className="subscription-form">
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={subscription.email}
          onChange={handleChange}
        />
        <button className="btn" type="submit" onClick={handleSubmit}>
          Subscribe
        </button>
        {error && <p className="error">{error}</p>}
      </div>
      {loading && (
        <p
          className="loading"
          style={{
            color: '#1AAC83',
          }}
        >
          Loading...
        </p>
      )}
    </div>
  );
};

export default Subscription;
