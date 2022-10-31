import './get-started.css';
import { Fade } from 'react-awesome-reveal';


const GetStarted = () => {
  return (
    <div className="get-started">
      <Fade>
      <h1>Get Started</h1>
      <p>Find your new best friend</p>
      <div className="get-started-btns">
        <button className="btn">
          {' '}
          <a href="/#contact">Adopt</a>
        </button>
        <button className="btn">
          <a href="/#contact">Donate</a>
        </button>
      </div>
      </Fade>
    </div>
  );
};

export default GetStarted;
