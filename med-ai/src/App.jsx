// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Services from "./components/Services";
// import About from "./components/About";
// import ContactUs from "./components/ContactUs";
// import Diagnosis from "./Diagnosis";
// import MRIsegmentation from "./components/MRI SEGMENTATion/MRIsegmentation";
// import SkinCancerDetection from "./components/Skin Cancer/SKinCancerDetection";
// import TuberculosisDetection from "./components/Tuberculosis/TuberculosisDetection";
// import ChatApp from "./components/Chatbot/ChatApp";


// function App(){
//   function HomePage(){
//     return (
//       <>
//         <Header/>
//         <Hero/>
//         <About/>
//         <Services/>
//         <ContactUs/>
//         <Footer/>
//       </>
//     );
//   }
//   return (
    
//     <div>
//        <HomePage/>  
  
//         <Routes>
//           <Route path="/" element={<HomePage/>  } />
//           <Route path="/Medical Diagnostics" element={<Diagnosis/>} />
//           <Route path="/Medical Chatbot" element={<ChatApp/>}/>
//           <Route path="/Medical Diagnostics/MRISegmentation" element={<MRIsegmentation/>} />
//           <Route path="/Medical Diagnostics/SkinCancerDetection" element={<SkinCancerDetection/>} />
//           <Route path="/Medical Diagnostics/TuberculosisDetection" element={<TuberculosisDetection/>} />

//         </Routes>

//     </div>
 
// );
// }
// export default App;


import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Services from "./components/Services";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Diagnosis from "./Diagnosis";
// import MRIsegmentation from "./components/MRI SEGMENTATion/MRIsegmentation";
import MRIsegmentation from "./components/MRISEGMENTATion/MRIsegmentation";
import SkinCancerDetection from "./components/Skin Cancer/SKinCancerDetection";
import TuberculosisDetection from "./components/Tuberculosis/TuberculosisDetection";
import ChatApp from "./components/Chatbot/ChatApp";
import SymptomChecker from "./components/SymptomChecker/SymptomChecker";


function HOME(){
  return(
  <>
    <Header/>
    <Hero/>
    <About/>
    <Services/>
    <ContactUs/>
  </>
  );
}

function App(){
  return(
  <>
    <div>
      <Routes>
        <Route path="/" element={<HOME/>  } />
        <Route path="/Medical Diagnostics" element={<Diagnosis/>} />
        <Route path="/Medical Chatbot" element={<ChatApp/>}/>
        <Route path="/Symptoms Checker" element={<SymptomChecker/>}/>
        <Route path="/Medical Diagnostics/MRISegmentation" element={<MRIsegmentation/>} />
        <Route path="/Medical Diagnostics/SkinCancerDetection" element={<SkinCancerDetection/>} />
        <Route path="/Medical Diagnostics/TuberculosisDetection" element={<TuberculosisDetection/>} />
      </Routes>

    </div>
    
  </>
  );
}
export default App;