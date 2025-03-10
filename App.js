import './App.css'; // Import the CSS file for styling
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/Navbar'; // Assuming Navbar is in Components folder
import Login from './Components/Login'; // Assuming Login component is in Components folder
import Home from './Components/Home'; // Example Home component (replace with your actual component)
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import About from './Components/About';
import Renting from './Components/Renting';
import Payment from './Components/Payment';
import Register from './Components/Register';
function App() {
  return (
   
    <Router>
      <MyNavbar />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/renting" element={<Renting />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
