// // SymptomChecker.jsx
// import React, { useState, useEffect } from 'react';
// import { AlertCircle, ChevronRight, Activity, Clock, Calendar, Filter, X, Heart, ThermometerSun } from 'lucide-react';
// import './SymptomChecker.css';

// const SymptomChecker = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [duration, setDuration] = useState('');
//   const [severity, setSeverity] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [medicalHistory, setMedicalHistory] = useState([]);
//   const [medications, setMedications] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [bodyPartFilter, setBodyPartFilter] = useState('all');

//   const bodyParts = {
//     head: ['Headache', 'Dizziness', 'Vision Problems', 'Ear Pain'],
//     chest: ['Chest Pain', 'Shortness of Breath', 'Heart Palpitations', 'Cough'],
//     abdomen: ['Stomach Pain', 'Nausea', 'Bloating', 'Loss of Appetite'],
//     limbs: ['Joint Pain', 'Muscle Weakness', 'Swelling', 'Numbness'],
//     general: ['Fever', 'Fatigue', 'Weight Loss', 'Night Sweats']
//   };

//   const severityLevels = [
//     { id: 'mild', label: 'Mild', description: 'Noticeable but not interfering with daily activities' },
//     { id: 'moderate', label: 'Moderate', description: 'Interfering with some daily activities' },
//     { id: 'severe', label: 'Severe', description: 'Significantly impacting daily life' },
//     { id: 'critical', label: 'Critical', description: 'Requires immediate medical attention' }
//   ];

//   const durationOptions = [
//     { id: 'hours', label: 'Hours', range: '< 24 hours' },
//     { id: 'days', label: 'Days', range: '1-7 days' },
//     { id: 'weeks', label: 'Weeks', range: '1-4 weeks' },
//     { id: 'months', label: 'Months', range: '> 1 month' }
//   ];

//   const commonConditions = [
//     'Diabetes',
//     'Hypertension',
//     'Asthma',
//     'Heart Disease',
//     'Arthritis',
//     'Thyroid Disorders'
//   ];

//   useEffect(() => {
//     if (analysisResult) {
//       document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [analysisResult]);

//   const handleSymptomSelect = (symptom) => {
//     if (selectedSymptoms.includes(symptom)) {
//       setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
//     } else {
//       setSelectedSymptoms([...selectedSymptoms, symptom]);
//     }
//   };

//   const handleMedicalHistoryToggle = (condition) => {
//     if (medicalHistory.includes(condition)) {
//       setMedicalHistory(medicalHistory.filter(c => c !== condition));
//     } else {
//       setMedicalHistory([...medicalHistory, condition]);
//     }
//   };



  

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://5b94-34-127-122-49.ngrok-free.app/analyze-symptoms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           symptoms: selectedSymptoms,
//           duration,
//           severity,
//           age,
//           gender,
//           medicalHistory,
//           medications
//         }),
//       });

//       const data = await response.json();
//       setAnalysisResult(data);
//       setCurrentStep(5); // Move to results step
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderSymptomSelector = () => (
//     <div className="symptom-selector-container">
//       <div className="filters-header">
//         <button 
//           className="filter-toggle"
//           onClick={() => setShowFilters(!showFilters)}
//         >
//           <Filter size={20} />
//           Filter by Body Part
//         </button>
//       </div>

//       {showFilters && (
//         <div className="body-part-filters">
//           <button 
//             className={`filter-button ${bodyPartFilter === 'all' ? 'active' : ''}`}
//             onClick={() => setBodyPartFilter('all')}
//           >
//             All
//           </button>
//           {Object.keys(bodyParts).map(part => (
//             <button
//               key={part}
//               className={`filter-button ${bodyPartFilter === part ? 'active' : ''}`}
//               onClick={() => setBodyPartFilter(part)}
//             >
//               {part.charAt(0).toUpperCase() + part.slice(1)}
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="symptoms-grid">
//         {Object.entries(bodyParts)
//           .filter(([part]) => bodyPartFilter === 'all' || bodyPartFilter === part)
//           .map(([part, symptoms]) => (
//             <div key={part} className="symptom-section">
//               <h3>{part.charAt(0).toUpperCase() + part.slice(1)}</h3>
//               <div className="symptom-buttons">
//                 {symptoms.map(symptom => (
//                   <button
//                     key={symptom}
//                     className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
//                     onClick={() => handleSymptomSelect(symptom)}
//                   >
//                     {symptom}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>

//       <div className="selected-symptoms-list">
//         <h3>Selected Symptoms:</h3>
//         <div className="selected-symptoms-container">
//           {selectedSymptoms.map(symptom => (
//             <span key={symptom} className="selected-symptom-tag">
//               {symptom}
//               <button onClick={() => handleSymptomSelect(symptom)}>
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderDurationSelector = () => (
//     <div className="duration-selector">
//       <h3>How long have you been experiencing these symptoms?</h3>
//       <div className="duration-options">
//         {durationOptions.map(option => (
//           <button
//             key={option.id}
//             className={`duration-button ${duration === option.id ? 'selected' : ''}`}
//             onClick={() => setDuration(option.id)}
//           >
//             <div className="duration-content">
//               <Clock size={20} />
//               <h4>{option.label}</h4>
//               <span>{option.range}</span>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const renderSeveritySelector = () => (
//     <div className="severity-selector">
//       <h3>How severe are your symptoms?</h3>
//       <div className="severity-options">
//         {severityLevels.map(level => (
//           <button
//             key={level.id}
//             className={`severity-button ${severity === level.id ? 'selected' : ''} ${level.id}`}
//             onClick={() => setSeverity(level.id)}
//           >
//             <div className="severity-content">
//               <h4>{level.label}</h4>
//               <p>{level.description}</p>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const renderPersonalInfo = () => (
//     <div className="personal-info">
//       <h3>Personal Information</h3>
//       <div className="form-group">
//         <label>Age</label>
//         <input
//           type="number"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           placeholder="Enter your age"
//           className="age-input"
//         />
//       </div>
//       <div className="form-group">
//         <label>Gender</label>
//         <div className="gender-options">
//           <button
//             className={`gender-button ${gender === 'male' ? 'selected' : ''}`}
//             onClick={() => setGender('male')}
//           >
//             Male
//           </button>
//           <button
//             className={`gender-button ${gender === 'female' ? 'selected' : ''}`}
//             onClick={() => setGender('female')}
//           >
//             Female
//           </button>
//           <button
//             className={`gender-button ${gender === 'other' ? 'selected' : ''}`}
//             onClick={() => setGender('other')}
//           >
//             Other
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderMedicalHistory = () => (
//     <div className="medical-history">
//       <h3>Medical History</h3>
//       <div className="conditions-grid">
//         {commonConditions.map(condition => (
//           <button
//             key={condition}
//             className={`condition-button ${medicalHistory.includes(condition) ? 'selected' : ''}`}
//             onClick={() => handleMedicalHistoryToggle(condition)}
//           >
//             {condition}
//           </button>
//         ))}
//       </div>
      
//       <div className="medications-section">
//         <h3>Current Medications</h3>
//         <div className="medications-input">
//           <input
//             type="text"
//             placeholder="Type medication and press Enter"
//             onKeyPress={(e) => {
//               if (e.key === 'Enter' && e.target.value.trim()) {
//                 setMedications([...medications, e.target.value.trim()]);
//                 e.target.value = '';
//               }
//             }}
//           />
//         </div>
//         <div className="medications-list">
//           {medications.map((med, index) => (
//             <span key={index} className="medication-tag">
//               {med}
//               <button onClick={() => setMedications(medications.filter((_, i) => i !== index))}>
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderResults = () => (
//     <div id="results-section" className="results-container">
//       {isLoading ? (
//         <div className="loading-spinner">
//           <Activity className="spin" />
//           <p>Analyzing your symptoms...</p>
//         </div>
//       ) : analysisResult ? (
//         <>
//           <div className="results-header">
//             <h2>Symptom Analysis Results</h2>
//             <div className="urgency-indicator">
//               <AlertCircle size={20} />
//               {analysisResult.urgency}
//             </div>
//           </div>

//           <div className="results-content">
//             <div className="possible-conditions">
//               <h3>Possible Conditions</h3>
//               {analysisResult.possibleConditions.map((condition, index) => (
//                 <div key={index} className="condition-card">
//                   <h4>{condition.name}</h4>
//                   <p>{condition.description}</p>
//                   <div className="match-percentage">
//                     <div 
//                       className="percentage-bar"
//                       style={{ width: `${condition.matchPercentage}%` }}
//                     ></div>
//                     <span>{condition.matchPercentage}% match</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="recommendations">
//               <h3>Recommendations</h3>
//               <ul>
//                 {analysisResult.recommendations.map((rec, index) => (
//                   <li key={index}>{rec}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="disclaimer">
//               <AlertCircle size={20} />
//               <p>This analysis is for informational purposes only and does not constitute medical advice. 
//                  Please consult with a healthcare professional for proper diagnosis and treatment.</p>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );

//   const steps = [
//     { title: 'Symptoms', component: renderSymptomSelector },
//     { title: 'Duration', component: renderDurationSelector },
//     { title: 'Severity', component: renderSeveritySelector },
//     { title: 'Personal Info', component: renderPersonalInfo },
//     { title: 'Medical History', component: renderMedicalHistory },
//     { title: 'Results', component: renderResults }
//   ];

//   return (
//     <div className="symptom-checker-container">
//       <div className="symptom-checker-header">
//         <div className="header-content">
//           <h1>
//             <ThermometerSun className="header-icon" />
//             Symptom Checker
//           </h1>
//           <p>Answer a few questions to get insights about your symptoms</p>
//         </div>
//       </div>

//       <div className="progress-bar">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`progress-step ${index === currentStep ? 'active' : ''} 
//                        ${index < currentStep ? 'completed' : ''}`}
//           >
//             <div className="step-number">{index + 1}</div>
//             <span className="step-title">{step.title}</span>
//           </div>
//         ))}
//       </div>

//       <div className="step-content">
//         {steps[currentStep].component()}
//       </div>

//       <div className="navigation-buttons">
//         {currentStep > 0 && (
//           <button
//             className="nav-button back"
//             onClick={() => setCurrentStep(currentStep - 1)}
//           >
//             Back
//           </button>
//         )}
//         {currentStep < steps.length - 1 ? (
//           <button
//             className="nav-button next"
//             onClick={() => setCurrentStep(currentStep + 1)}
//             disabled={
//               (currentStep === 0 && selectedSymptoms.length === 0) ||
//               (currentStep === 1 && !duration) ||
//               (currentStep === 2 && !severity) ||
//               (currentStep === 3 && (!age || !gender))
//             }
//           >
//             Next
//           </button>
//         ) : (
//           currentStep === steps.length - 1 && !analysisResult && (
//             <button
//               className="nav-button analyze"
//               onClick={handleSubmit}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default SymptomChecker;




// SymptomChecker.jsx
import React, { useState, useEffect } from 'react';
import './SymptomChecker.css';
import { AlertCircle, ChevronRight, Activity, Clock, Calendar, Filter, X, Heart, ThermometerSun } from 'lucide-react';

const SymptomChecker = () => {
  // State Management
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medications, setMedications] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [bodyPartFilter, setBodyPartFilter] = useState('all');

  // Full screen handling
  useEffect(() => {
    const resizeHandler = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  // Scroll to results when available
  useEffect(() => {
    if (analysisResult) {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [analysisResult]);

  // Data Constants
  const bodyParts = {
    head: ['Headache', 'Dizziness', 'Vision Problems', 'Ear Pain'],
    chest: ['Chest Pain', 'Shortness of Breath', 'Heart Palpitations', 'Cough'],
    abdomen: ['Stomach Pain', 'Nausea', 'Bloating', 'Loss of Appetite'],
    limbs: ['Joint Pain', 'Muscle Weakness', 'Swelling', 'Numbness'],
    general: ['Fever', 'Fatigue', 'Weight Loss', 'Night Sweats']
  };

  const severityLevels = [
    { id: 'mild', label: 'Mild', description: 'Noticeable but not interfering with daily activities' },
    { id: 'moderate', label: 'Moderate', description: 'Interfering with some daily activities' },
    { id: 'severe', label: 'Severe', description: 'Significantly impacting daily life' },
    { id: 'critical', label: 'Critical', description: 'Requires immediate medical attention' }
  ];

  const durationOptions = [
    { id: 'hours', label: 'Hours', range: '< 24 hours' },
    { id: 'days', label: 'Days', range: '1-7 days' },
    { id: 'weeks', label: 'Weeks', range: '1-4 weeks' },
    { id: 'months', label: 'Months', range: '> 1 month' }
  ];

  const commonConditions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Arthritis',
    'Thyroid Disorders'
  ];

  // Event Handlers
  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleMedicalHistoryToggle = (condition) => {
    setMedicalHistory(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://4809-35-247-64-175.ngrok-free.app/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          duration,
          severity,
          age,
          gender,
          medicalHistory,
          medications
        }),
      });

      const data = await response.json();
      setAnalysisResult(data);
      setCurrentStep(5);
    } catch (error) {
      console.error('Error:', error);
      // Could add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  // Render Functions
  const renderSymptomSelector = () => (
    <div className="symptom-selector-container">
      <div className="filters-header">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Filter by Body Part
        </button>
      </div>

      {showFilters && (
        <div className="body-part-filters">
          <button 
            className={`filter-button ${bodyPartFilter === 'all' ? 'active' : ''}`}
            onClick={() => setBodyPartFilter('all')}
          >
            All
          </button>
          {Object.keys(bodyParts).map(part => (
            <button
              key={part}
              className={`filter-button ${bodyPartFilter === part ? 'active' : ''}`}
              onClick={() => setBodyPartFilter(part)}
            >
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="symptoms-grid">
        {Object.entries(bodyParts)
          .filter(([part]) => bodyPartFilter === 'all' || bodyPartFilter === part)
          .map(([part, symptoms]) => (
            <div key={part} className="symptom-section">
              <h3>{part.charAt(0).toUpperCase() + part.slice(1)}</h3>
              <div className="symptom-buttons">
                {symptoms.map(symptom => (
                  <button
                    key={symptom}
                    className={`symptom-button ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                    onClick={() => handleSymptomSelect(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="selected-symptoms-list">
        <h3>Selected Symptoms:</h3>
        <div className="selected-symptoms-container">
          {selectedSymptoms.map(symptom => (
            <span key={symptom} className="selected-symptom-tag">
              {symptom}
              <button onClick={() => handleSymptomSelect(symptom)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDurationSelector = () => (
    <div className="duration-selector">
      <h3>How long have you been experiencing these symptoms?</h3>
      <div className="duration-options">
        {durationOptions.map(option => (
          <button
            key={option.id}
            className={`duration-button ${duration === option.id ? 'selected' : ''}`}
            onClick={() => setDuration(option.id)}
          >
            <div className="duration-content">
              <Clock size={20} />
              <h4>{option.label}</h4>
              <span>{option.range}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSeveritySelector = () => (
    <div className="severity-selector">
      <h3>How severe are your symptoms?</h3>
      <div className="severity-options">
        {severityLevels.map(level => (
          <button
            key={level.id}
            className={`severity-button ${severity === level.id ? 'selected' : ''} ${level.id}`}
            onClick={() => setSeverity(level.id)}
          >
            <div className="severity-content">
              <h4>{level.label}</h4>
              <p>{level.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="personal-info">
      <h3>Personal Information</h3>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          className="age-input"
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="gender-options">
          <button
            className={`gender-button ${gender === 'male' ? 'selected' : ''}`}
            onClick={() => setGender('male')}
          >
            Male
          </button>
          <button
            className={`gender-button ${gender === 'female' ? 'selected' : ''}`}
            onClick={() => setGender('female')}
          >
            Female
          </button>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="medical-history">
      <h3>Medical History</h3>
      <div className="conditions-grid">
        {commonConditions.map(condition => (
          <button
            key={condition}
            className={`condition-button ${medicalHistory.includes(condition) ? 'selected' : ''}`}
            onClick={() => handleMedicalHistoryToggle(condition)}
          >
            {condition}
          </button>
        ))}
      </div>
      
      <div className="medications-section">
        <h3>Current Medications</h3>
        <div className="medications-input">
          <input
            type="text"
            placeholder="Type medication and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setMedications([...medications, e.target.value.trim()]);
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="medications-list">
          {medications.map((med, index) => (
            <span key={index} className="medication-tag">
              {med}
              <button onClick={() => setMedications(medications.filter((_, i) => i !== index))}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div id="results-section" className="results-container">
      {isLoading ? (
        <div className="loading-spinner">
          <Activity className="spin" />
          <p>Analyzing your symptoms...</p>
        </div>
      ) : analysisResult ? (
        <>
          <div className="results-header">
            <h2>Symptom Analysis Results</h2>
            <div className={`urgency-indicator ${analysisResult.urgency.toLowerCase()}`}>
              <AlertCircle size={20} />
              {analysisResult.urgency} Attention Required
            </div>
          </div>

          <div className="results-content">
            <div className="possible-conditions">
              <h3>Possible Conditions</h3>
              {analysisResult.possibleConditions.map((condition, index) => (
                <div key={index} className="condition-card">
                  <div className="condition-header">
                    <h4>{condition.name}</h4>
                    <span className="match-percentage">{condition.matchPercentage}% match</span>
                  </div>
                  
                  <p className="condition-description">{condition.description}</p>
                  
                  <div className="condition-details">
                    <div className="key-symptoms">
                      <h5>Key Symptoms</h5>
                      <ul>
                        {condition.keySymptoms?.map((symptom, idx) => (
                          <li key={idx}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="risk-factors">
                      <h5>Risk Factors</h5>
                      <ul>
                        {condition.riskFactors?.map((factor, idx) => (
                          <li key={idx}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="recommendations">
              <h3>Recommended Actions</h3>
              {analysisResult.recommendations.map((rec, index) => (
                <div key={index} className={`recommendation-item ${typeof rec === 'object' ? rec.type : 'general'}`}>
                  {typeof rec === 'object' ? (
                    <>
                      <h4>{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Action</h4>
                      <p>{rec.description}</p>
                    </>
                  ) : (
                    <p>{rec}</p>
                  )}
                </div>
              ))}
            </div>

            {analysisResult.additionalNotes && (
              <div className="additional-notes">
                <h3>Additional Considerations</h3>
                <p>{analysisResult.additionalNotes}</p>
              </div>
            )}

            <div className="disclaimer">
              <AlertCircle size={20} />
              <p>This analysis is for informational purposes only and does not constitute medical advice. 
                 Please consult with a healthcare professional for proper diagnosis and treatment.</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );

  const steps = [
    { title: 'Symptoms', component: renderSymptomSelector },
    { title: 'Duration', component: renderDurationSelector },
    { title: 'Severity', component: renderSeveritySelector },
    { title: 'Personal Info', component: renderPersonalInfo },
    { title: 'Medical History', component: renderMedicalHistory },
    { title: 'Results', component: renderResults }
  ];

  return (
    <div className="symptom-checker-container">
      <div className="symptom-checker-header">
        <div className="header-content">
          <h1>
            <ThermometerSun className="header-icon" />
            Symptom Checker
          </h1>
          <p>Answer a few questions to get insights about your symptoms</p>
        </div>
      </div>

      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${index === currentStep ? 'active' : ''} 
                       ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="step-content">
        {steps[currentStep].component()}
      </div>

      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button
            className="nav-button back"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            className="nav-button next"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={
              (currentStep === 0 && selectedSymptoms.length === 0) ||
              (currentStep === 1 && !duration) ||
              (currentStep === 2 && !severity) ||
              (currentStep === 3 && (!age || !gender))
            }
          >
            Next
          </button>
        ) : (
          currentStep === steps.length - 1 && !analysisResult && (
            <button
              className="nav-button analyze"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;











