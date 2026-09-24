import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Shopping from './components/Shopping';
import Partners from './components/Partners';
import Testimonial from './components/Testimonial';
import CTAFooter from './components/CTAFooter';

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Shopping />
      <Partners />
      <Testimonial />
      <CTAFooter />
    </div>
  );
}

export default App;
