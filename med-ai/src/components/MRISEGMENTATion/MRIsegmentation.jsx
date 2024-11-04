import React, { useState, useEffect } from 'react';
import { TIFFViewer } from 'react-tiff';
import 'react-tiff/dist/index.css';
import './MRISegmentation.css';

const MRISegmentation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isTiff, setIsTiff] = useState(false);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      displayImage(file);
    } else {
      setError('Unsupported file type. Please upload a JPEG, PNG, GIF, or TIFF image.');
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
    if (validateFile(file)) {
      setSelectedFile(file);
      displayImage(file);
    } else {
      setError('Unsupported file type. Please upload a JPEG, PNG, GIF, or TIFF image.');
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/tif'];
    const isValidType = validTypes.includes(file.type) || /\.(tif|tiff)$/i.test(file.name);
    return isValidType;
  };

  const displayImage = (file) => {
    console.log('Displaying image:', file.name);
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isTiffFile = fileExtension === 'tif' || fileExtension === 'tiff';
    setIsTiff(isTiffFile);

    if (isTiffFile) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    setSegmentedImage(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://0fa2-34-136-251-82.ngrok-free.app/predict/mri_brain_seg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Segmentation failed');

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setSegmentedImage(imageUrl);
    } catch (err) {
      console.error('Error during segmentation:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="header">
          <h1>MRI Brain Segmentation</h1>
          <p className="subtitle">Upload a clear MRI brain image for automated segmentation</p>
        </div>

        <div className="upload-section">
          <div className="upload-area" onDragOver={handleDragOver} onDrop={handleDrop}>
            {!preview ? (
              <>
                <input
                  type="file"
                  accept="image/*,.tif,.tiff"
                  onChange={handleFileSelect}
                  id="file-input"
                  className="file-input"
                />
                <label htmlFor="file-input" className="upload-label">
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </div>
                  <span>Drop an MRI image here or click to upload</span>
                  <p className="upload-hint">Supported formats: JPEG, PNG, GIF, TIFF</p>
                </label>
              </>
            ) : (
              <div className="preview-container">
                {isTiff ? (
                  <TIFFViewer
                    tiff={preview}
                    lang="en"
                    paginate="ltr"
                    buttonColor="#141414"
                    printable
                    className="preview-image"
                  />
                ) : (
                  <img src={preview} alt="Preview" className="preview-image" />
                )}
                <button
                  className="remove-image"
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    setSegmentedImage(null);
                    setIsTiff(false);
                  }}
                  aria-label="Remove image"
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
            {loading ? 'Processing...' : 'Segment MRI'}
          </button>
        </div>

        {/* <div className="medical-notice"> */}
          {/* <h3>⚠️ Important Medical Notice</h3> */}
          {/* <p>
            This tool is for research and educational purposes only. It should not replace
            professional medical analysis. Please consult a qualified healthcare provider for proper evaluation and diagnosis.
          </p> */}
        {/* </div> */}
      </div>

      <div className="right-panel">
        <div className="results-container">
          <h2>Segmentation Results</h2>

          {error && <div className="error-message">{error}</div>}

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Processing your MRI image...</p>
            </div>
          )}

          {!loading && !segmentedImage && !error && (
            <div className="empty-state">
              <p>Upload an MRI image to see the segmentation results</p>
            </div>
          )}

          {segmentedImage && (
            <div className="segmentation-result">
              <img src={segmentedImage} alt="Segmented MRI" className="segmented-image" />
              <div className="segmentation-explanation">
                {/* <h3>Segmentation Explanation</h3> */}
                {/* <p>
                  The image above shows the segmented regions of the brain. Different colors represent different tissue types or structures. This segmentation can help in identifying and analyzing various brain regions for research or educational purposes.
                </p> */}
                {/* <p>
                  Please note that this is an automated segmentation and should be reviewed by a qualified professional for any medical interpretation.
                </p> */}
              </div>
            </div>
          )}

          <div className="disclaimer">
            <strong>Disclaimer:</strong> This MRI segmentation is generated by an AI system and its should be used with guidance from a medical expert
          </div>
        </div>
      </div>
    </div>
  );
};

export default MRISegmentation;







