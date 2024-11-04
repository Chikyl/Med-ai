import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-us-section">
      <div className="contact-us-container">
        <div className="contact-us-info">
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns, please feel free to reach out to us. We are here to help!</p>
          <div className="contact-details">
            <div className="contact-detail">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>support@chikylmedical.com</p>
            </div>
            <div className="contact-detail">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>(+265) 88-531-7327</p>
            </div>
            <div className="contact-detail">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>123 Medical Street, Health City, HC 45678</p>
            </div>
          </div>
        </div>
        <div className="contact-us-form">
          <h2>Get In Touch</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

