// import React, { useState,useEffect } from 'react';
// import './Tuberculosis.css';  // You may want to rename this CSS file

// const TuberculosisDetection = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [heatmapUrl, setHeatmapUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//       setPrediction(null);
//       setHeatmapUrl(null);
//       setError(null);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//       setPrediction(null);
//       setHeatmapUrl(null);
//       setError(null);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) return;

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('https://e452-34-105-15-137.ngrok-free.app/predict', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Prediction failed');

//       const data = await response.json();
//       console.log(data.heatmap_url);
//       setPrediction(data.pneumonia_probability);
//       setHeatmapUrl(`https://e452-34-105-15-137.ngrok-free.app${data.heatmap_url}`);
//     } catch (err) {
//       setError('Failed to process image. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRiskLevel = (probability) => {
//     if (probability >= 0.7) return { level: 'high', icon: '⚠️', text: 'High Risk of Pneumonia' };
//     if (probability >= 0.3) return { level: 'medium', icon: '⚠️', text: 'Medium Risk of Pneumonia' };
//     return { level: 'low', icon: '✓', text: 'Low Risk of Pneumonia' };
//   };



//   useEffect(() => {
//   if (heatmapUrl) {
//     console.log('Heatmap URL:', heatmapUrl);
//   }
// }, [heatmapUrl]);



//   return (
//     <div className="app-container">
//       {/* Left Panel - Upload Section */}
//       <div className="left-panel">
//         <div className="header">
//           <h1>Pneumonia Detection</h1>
//           <p className="subtitle">
//             Upload a chest X-ray image for pneumonia analysis
//           </p>
//         </div>

//         <div className="upload-section">
//           <div 
//             className="upload-area"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             {!preview ? (
//               <>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileSelect}
//                   id="file-input"
//                   className="file-input"
//                 />
//                 <label htmlFor="file-input" className="upload-label">
//                   <div className="upload-icon">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
//                     </svg>
//                   </div>
//                   <span>Drop an X-ray image here or click to upload</span>
//                   <p className="upload-hint">
//                     For accurate results, ensure the X-ray image is clear and properly oriented
//                   </p>
//                 </label>
//               </>
//             ) : (
//               <div className="preview-container">
//                 <img src={preview} alt="Preview" className="preview-image"/>
//                 <button 
//                   className="remove-image"
//                   onClick={() => {
//                     setPreview(null);
//                     setSelectedFile(null);
//                     setPrediction(null);
//                     setHeatmapUrl(null);
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//           </div>

//           <button 
//             className={`analyze-button ${!selectedFile || loading ? 'disabled' : ''}`}
//             onClick={handleSubmit}
//             disabled={!selectedFile || loading}
//           >
//             {loading ? 'Analyzing...' : 'Analyze X-ray'}
//           </button>
//         </div>
//       </div>

//       {/* Right Panel - Results Section */}
//       <div className="right-panel">
//         <div className="results-container">
//           <h2>Analysis Results</h2>

//           {error && (
//             <div className="error-message">
//               {error}
//             </div>
//           )}

//           {loading && (
//             <div className="loading-state">
//               <div className="spinner"></div>
//               <p>Analyzing your X-ray image...</p>
//             </div>
//           )}

//           {!loading && !prediction && !error && (
//             <div className="empty-state">
//               <p>Upload an X-ray image to receive detailed analysis</p>
//             </div>
//           )}

//           {prediction !== null && (
//             <div className="predictions-content">
//               <div className="prediction-section">
//                 <h3>Pneumonia Detection Results</h3>
//                 <div className="prediction-item">
//                   <div className="condition-header">
//                     <span className="condition-name">Pneumonia Probability</span>
//                     <span className="probability">
//                       {(prediction * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill"
//                       style={{ width: `${prediction * 100}%` }}
//                     ></div>
//                   </div>
//                   <div className={`risk-indicator ${getRiskLevel(prediction).level}`}>
//                     {getRiskLevel(prediction).icon} {getRiskLevel(prediction).text}
//                   </div>
//                 </div>

//                 {heatmapUrl && (
//                   <div className="heatmap-section">
//                     {/* // <h1>{console.log('Heatmap URL:', heatmapUrl)}</h1> */}
//                     <h3>Visualization</h3>
//                     <img 
//                       src={heatmapUrl} 
//                       alt="Heatmap visualization" 
//                       className="heatmap-image"
//                     />
//                     <p className="heatmap-description">
//                       The heatmap highlights areas of the X-ray that influenced the model's decision. 
//                       Warmer colors (red) indicate regions more strongly associated with pneumonia.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="disclaimer">
//                 <strong>Disclaimer:</strong> This analysis is generated by an AI system 
//                 and should be reviewed by a qualified healthcare professional. If you 
//                 have any concerns about pneumonia or respiratory issues, please seek 
//                 immediate medical attention.
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TuberculosisDetection;


import React, { useState } from 'react';
import './Tuberculosis.css';

const TuberculosisDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [heatmapImage, setHeatmapImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setHeatmapImage(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null);
      setHeatmapImage(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://0fa2-34-136-251-82.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      setPrediction(data.pneumonia_probability);
      setHeatmapImage(data.heatmap_image);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (probability) => {
    if (probability >= 0.7) return { level: 'high', icon: '⚠️', text: 'High Risk of Pneumonia' };
    if (probability >= 0.3) return { level: 'medium', icon: '⚠️', text: 'Medium Risk of Pneumonia' };
    return { level: 'low', icon: '✓', text: 'Low Risk of Pneumonia' };
  };

  return (
    <div className="app-container">
      {/* Left Panel - Upload Section */}
      <div className="left-panel">
        <div className="header">
          <h1>Pneumonia Detection</h1>
          <p className="subtitle">
            Upload a chest X-ray image for pneumonia analysis
          </p>
        </div>

        <div className="upload-section">
          <div 
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!preview ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  id="file-input"
                  className="file-input"
                />
                <label htmlFor="file-input" className="upload-label">
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                  </div>
                  <span>Drop an X-ray image here or click to upload</span>
                  <p className="upload-hint">
                    For accurate results, ensure the X-ray image is clear and properly oriented
                  </p>
                </label>
              </>
            ) : (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image"/>
                <button 
                  className="remove-image"
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    setPrediction(null);
                    setHeatmapImage(null);
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <button 
            className={`analyze-button ${!selectedFile || loading ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!selectedFile || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze X-ray'}
          </button>
        </div>
      </div>

      {/* Right Panel - Results Section */}
      <div className="right-panel">
        <div className="results-container">
          <h2>Analysis Results</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Analyzing your X-ray image...</p>
            </div>
          )}

          {!loading && !prediction && !error && (
            <div className="empty-state">
              <p>Upload an X-ray image to receive detailed analysis</p>
            </div>
          )}

          {prediction !== null && (
            <div className="predictions-content">
              <div className="prediction-section">
                <h3>Pneumonia Detection Results</h3>
                <div className="prediction-item">
                  <div className="condition-header">
                    <span className="condition-name">Pneumonia Probability</span>
                    <span className="probability">
                      {(prediction * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${prediction * 100}%` }}
                    ></div>
                  </div>
                  <div className={`risk-indicator ${getRiskLevel(prediction).level}`}>
                    {getRiskLevel(prediction).icon} {getRiskLevel(prediction).text}
                  </div>
                </div>

                {heatmapImage && (
                  <div className="heatmap-section">
                    <h3>Visualization</h3>
                    <img 
                      src={heatmapImage}
                      alt="Heatmap visualization" 
                      className="heatmap-image"
                    />
                    <p className="heatmap-description">
                      The heatmap highlights areas of the X-ray that influenced the model's decision. 
                      Warmer colors (red) indicate regions more strongly associated with pneumonia.
                    </p>
                  </div>
                )}
              </div>

              <div className="disclaimer">
                <strong>Disclaimer:</strong> This analysis is generated by an AI system 
                and should be reviewed by a qualified healthcare professional. If you 
                have any concerns about pneumonia or respiratory issues, please seek 
                immediate medical attention.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuberculosisDetection;
