import React from 'react';
import './About.css';
import aboutImage from '../assets/m3.jpeg'; // Update the path to your image

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>We are a leading medical AI company committed to providing advanced diagnostic and monitoring solutions. Our mission is to enhance patient care through innovative technology and dedicated service. We believe in leveraging the power of AI to transform healthcare, making it more efficient, accurate, and accessible for everyone.</p>
          <button className="cta-button">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default About;
