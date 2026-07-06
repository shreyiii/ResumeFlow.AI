import react from 'react';
import Banner from '../componets/home/Banner';
import Hero from '../componets/home/Hero';
import Features from '../componets/home/Features';
import Testimonial from '../componets/home/Testimonial';
import CallToActions from '../componets/home/CallToActions';
import Footer from '../componets/home/Footer';
const Home = () => {
  return (
    <div>
      <Banner/>
      <Hero/>
      <Features/>
      <Testimonial/>
      <CallToActions/>
      <Footer/>
    </div>
  );
}

export default Home