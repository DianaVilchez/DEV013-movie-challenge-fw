import   './styles/styles.css'
import Home from '../src/components/Home'
// import Landing from './views/Landing';
// import About from './views/About.jsx';
import { Route, Routes } from "react-router-dom"
 
 
function App() {
  return (
   <>
  
      <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </>
 );
  
}
 
export default App
