import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div>

      <Routes>
          
          <Route path = "/" element = {<Login/>} />
          <Route path = "/home" element = {<Home/>} />

      </Routes>
    
    </div>
  );
}

export default App;
