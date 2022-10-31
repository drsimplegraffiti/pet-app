import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import GetStarted from '../components/GetStarted';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Subscription from '../components/Subscription';

const Home = () => {
  return (
    // homepage with hero section,get started, subscription section , how it works and contact us section
    <div className="home">
      <Hero />
      <GetStarted />
      <HowItWorks />
      <Subscription />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
