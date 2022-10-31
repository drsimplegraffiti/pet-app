import './hero.css';
import { Bounce } from 'react-awesome-reveal';

const Hero = () => {
  return (
    // hero section with animals images
    <div className="hero">
      <Bounce>

      <img
        src="https://res.cloudinary.com/drsimple/image/upload/v1662472046/vector_gv3npk.jpg"
        alt="animal"
        className="hero-img"
        />
      <div className="hero-text">
        <h1>Adopt a pet</h1>
        <p>Find your new best friend</p>
      </div>
        </Bounce>
    </div>
  );
};

export default Hero;
