import "./how-it-works.css"

const HowItWorks = () => {
  return (
    // how it works
    <div className="how-it-works">
      <h1>How it works</h1>
      <p>Find your new best friend</p>
      <div className="how-it-works-cards">
        <div className="how-it-works-card">
          <i className="fas fa-search"></i>
          <h2>Search</h2>
          <p>Search for your new best friend</p>
        </div>
        <div className="how-it-works-card">
          <i className="fas fa-paw"></i>
          <h2>Adopt</h2>
          <p>Adopt your new best friend</p>
        </div>
        <div className="how-it-works-card">
          <i className="fas fa-heart"></i>
          <h2>Love</h2>
          <p>Love your new best friend</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
