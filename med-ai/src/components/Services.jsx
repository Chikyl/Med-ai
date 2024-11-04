import React from 'react';
// import './Services.css';
import diagnosticsImage from '../assets/image.jpeg';
import symptomsCheckerImage from '../assets/images.jpg';;
import chatbotImage from '../assets/m6.jpeg';
import aiPatientMonitorImage from '../assets/try.jpg';import { Link } from 'react-router-dom';
;

const services = [
  {
    title: 'Medical Diagnostics',
    description: 'Accurate diagnostics for a variety of medical conditions using advanced AI algorithms.',
    image: diagnosticsImage,
    buttonText: 'Learn More',
    to:'/Medical Diagnostics'
  },
  {
    title: 'Symptoms Checker',
    description: 'Quickly identify potential medical conditions based on your symptoms.',
    image: symptomsCheckerImage,
    buttonText: 'Try Now',
    to:'/Symptoms Checker'
  },
  {
    title: 'Medical Chatbot',
    description: '24/7 assistance from our AI-powered medical chatbot.',
    image: chatbotImage,
    buttonText: 'Chat Now',
    to:'/Medical Chatbot'
  },
  {
    title: 'AI Patient Monitor',
    description: 'Continuous monitoring and analysis of patient vitals using AI.',
    image: aiPatientMonitorImage,
    buttonText: 'Monitor Now',
    to:'/AI Patient Monitor'
  }
];

const Services = () => {
  return (
    <section className="service-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to={service.to}><button>{service.buttonText}</button></Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
