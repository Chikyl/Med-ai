import React from "react";
import "./Diagnosis.css";
import MRimg from "./assets/mri.jpg";
import SCimg from "./assets/sc.jpg";
import TBimg from "./assets/pt.png";
import Bcimg from "./assets/m9.jpeg";

const diagnostics = [
  {
    title: 'Skin Cancer Detection',
    description: 'Upload an image of a skin lesion to detect the presence of skin cancer using advanced AI algorithms.',
  //   image: 'path/to/skin-cancer.jpg',
    image: SCimg,
    buttonText: 'Learn More',
    link: '/Medical Diagnostics/SkinCancerDetection'
  },
  {
    title: 'Brain Tumor Segmentation',
    description: 'Get accurate brain tumor segmentation from MRI scans using state-of-the-art AI models.',
    image: MRimg,
    buttonText: 'Learn More',
    link: '/Medical Diagnostics/MRISegmentation'
  },
  {
    title: 'Pneumonia Detection',
    description: 'Upload chest X-rays to detect the presence of pneumonia with high precision.',
    image: TBimg,
    buttonText: 'Learn More',
    link: '/Medical Diagnostics/TuberculosisDetection'
  },
  {
    title: 'Breast Cancer Detection',
    description: 'Detect breast cancer from mammograms using the latest AI-powered detection systems.',
    image: Bcimg ,
    buttonText: 'Learn More',
    link: '/breast-cancer-detection'
  }
];

const Diagnosis = () => {
  return (
    <section className="medical-diagnostics">
      <div className="container">
        <h2>Medical Diagnostics</h2>
        {diagnostics.map((diagnostic, index) => (
          <div className="diagnostic-row" key={index}>
            <img src={diagnostic.image} alt={diagnostic.title} className="diagnostic-image"/>
            <div className="diagnostic-content">
              <h3>{diagnostic.title}</h3>
              <p>{diagnostic.description}</p>
              <a href={diagnostic.link} className="cta-button">{diagnostic.buttonText}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Diagnosis;



