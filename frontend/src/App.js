import {
    BrowserRouter as Router,
    Routes,
    Route, 
  } from "react-router-dom";import './App.css';
import Main from './components/main'

function App() {
    return ( 
    <Router >
        <Routes>
        
            <Route path="/" element={<Main />} />
  
        </Routes> 
  </Router> );
}

export default App;