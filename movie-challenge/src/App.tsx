import   './styles/styles.css'
import './styles/detailsStyles.css'
import Home from '../src/components/Home'

// import Landing from './views/Landing';
// import About from './views/About.jsx';
import { Route, Routes } from "react-router-dom"
import { MovieDetails } from './components/MovieDetails';
 
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
 
export default App
