import React, { useState } from 'react';
import './SkinCancerDetection.css';

const SkinCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState({
    model1: null, // multiclass predictions
    model2: null  // binary predictions
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setPredictions({ model1: null, model2: null });
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
      setPredictions({ model1: null, model2: null });
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
      const response = await fetch('https://d365-34-138-60-160.ngrok-free.app/predict/Skin', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      setPredictions(data);
    } catch (err) { 
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (probability) => {
    if (probability >= 0.7) return { level: 'high', icon: '⚠️', text: 'High Risk' };
    if (probability >= 0.3) return { level: 'medium', icon: '⚠️', text: 'Medium Risk' };
    return { level: 'low', icon: '✓', text: 'Low Risk' };
  };

  return (
    <div className="app-container">
      {/* Left Panel - Upload Section */}
      <div className="left-panel">
        <div className="header">
          <h1>Skin Cancer Detection</h1>
          <p className="subtitle">
            Upload a clear, well-lit image of the skin lesion for professional analysis
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
                  <span>Drop an image here or click to upload</span>
                  <p className="upload-hint">
                    For accurate results, ensure the image is clear and well-lit
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
                    setPredictions({ model1: null, model2: null });
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
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        {/* <div className="medical-notice"> */}
          {/* <h3>⚠️ Important Medical Notice</h3> */}
          {/* <p>
            This tool is for preliminary screening only and should not replace 
            professional medical consultation. Please consult a healthcare provider 
            for proper evaluation regardless of these results.
          </p> */}
        {/* </div> */}
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
              <p>Analyzing your image...</p>
            </div>
          )}

          {!loading && !predictions.model1 && !error && (
            <div className="empty-state">
              <p>Upload an image to receive detailed analysis</p>
            </div>
          )}

          {predictions.model1 && (
            <div className="predictions-content">
              <div className="prediction-section">
                <h3>Detailed Classification</h3>
                {Object.entries(predictions.model1).map(([condition, probability], index) => (
                  <div key={index} className="prediction-item">
                    <div className="condition-header">
                      <span className="condition-name">{condition}</span>
                      <span className="probability">
                        {(probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${probability * 100}%` }}
                      ></div>
                    </div>
                    <div className={`risk-indicator ${getRiskLevel(probability).level}`}>
                      {getRiskLevel(probability).icon} {getRiskLevel(probability).text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="prediction-section">
                <h3>Binary Classification</h3>
                {Object.entries(predictions.model2).map(([condition, probability], index) => (
                  <div key={index} className="prediction-item">
                    <div className="condition-header">
                      <span className="condition-name">{condition}</span>
                      <span className="probability">
                        {(probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${probability * 100}%` }}
                      ></div>
                    </div>
                    <div className={`risk-indicator ${getRiskLevel(probability).level}`}>
                      {getRiskLevel(probability).icon} {getRiskLevel(probability).text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="disclaimer">
                <strong>Disclaimer:</strong> These results are generated by an AI system 
                and should be reviewed by a qualified healthcare professional. Early 
                detection is crucial for successful treatment of skin cancer. If you 
                have any concerns, please seek immediate medical attention.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinCancerDetection;