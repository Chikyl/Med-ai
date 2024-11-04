// import React, { useState } from 'react';
// import { Link } from "react-scroll";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">Chikyl</Link>
//       </div>
//       <div className="navbar-center">
//         <ul className={`navbar-links ${isOpen ? 'navbar-links-active' : ''}`}>
//           <li>
//             <Link to="hero-section" smooth={true} duration >Home</Link>
//           </li>
//           <li>
//             <Link to="about-section" smooth={true} >About</Link>
//           </li>
//           <li>
//             <Link to="service-section" smooth={true} duration >Services</Link>
//           </li>
//           <li>
//             <Link to="contact-us-section" smooth={true} duration >Contact</Link>
//             {/* <Link to="contact-us-section" smooth={true} duration onClick={toggleMenu}>Contact</Link> */}
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-buttons">
//         <Link to="/signup" className="btn" onClick={toggleMenu}>Sign Up</Link>
//         <Link to="/signin" className="btn" onClick={toggleMenu}>Sign In</Link>
//       </div>
//       <div className="navbar-menu-icon" onClick={toggleMenu}>
//         ☰
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaUser, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Home', to: 'hero-section' },
    { name: 'About', to: 'about-section' },
    { name: 'Services', to: 'service-section' },
    { name: 'Contact', to: 'contact-us-section' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="hero-section" smooth={true} duration={500}>Chikyl</Link>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar-buttons">
            <Link to="/signup" className="btn btn-primary">
              <FaUser /> Sign Up
            </Link>
            <Link to="/signin" className="btn btn-secondary">
              <FaSignInAlt /> Sign In
            </Link>
          </div>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
