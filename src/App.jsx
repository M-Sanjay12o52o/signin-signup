import './App.css'
import Signin from './Signin';
import Signup from './Signup';
import Appbar from './Appbar';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
      <Appbar />
    <div style={{display: "flex", justifyContent: "center"}}>
     <Routes>
      <Route path='/homepage' element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
     </Routes>
    </div>
    </Router>
    </div>
  )
}

export default App
