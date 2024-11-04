// import React from 'react';
// import heroImage from '../assets/image.jpeg'; // Update the path to your image

// const Hero = () => {
//   return (
//     <section className="hero-section">
//       <div className="hero-content">
//         <h1>Welcome to Chikyl Medical App</h1>
//         <p>Your trusted partner in medical care and services.</p>
//         <button className="cta-button">Get Started</button>
//       </div>
//       <div className="hero-image">
//         {/* <img src={heroImage} alt="Medical" /> */}
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import heroImage from '../assets/image.jpeg'; // Update the path to your image

const Hero = () => {
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Chikyl Medical A.I</h1>
          {/* <p className="hero-subtitle">Your trusted partner in medical care and services.</p> */}
          <div className="hero-features">
            <div className="hero-feature">
              <FaArrowRight className="feature-icon" />
              <span>AI-Powered Disease Diagnosis </span>
            </div>
            <div className="hero-feature">
              <FaArrowRight className="feature-icon" />
              <span>Early Detection, Better Outcomes</span>
            </div>
            <div className="hero-feature">
              <FaArrowRight className="feature-icon" />
              <span>Accessible, Reliable Healthcare </span>
            </div>
          </div>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Chikyl Medical Services" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

