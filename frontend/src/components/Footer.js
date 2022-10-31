import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">
            {' '}
            <span>Adopt</span> a pet
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quae.
          </p>
          <div className="contact">
            <div className="contact-icons">
              <i className="fas fa-phone"></i> 123-456-789
            </div>
            <div className="contact-icons">
              <i className="fas fa-envelope"> &nbsp; abayomiogunnusi@gmail.com</i>
              &nbsp;
            </div>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <br />
          <ul>
            <a href="/#">
              <li>Events</li>
            </a>
            <a href="/#">
              <li>Team</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
