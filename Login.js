import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../CSS/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  // Handle input changes from user
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: 
      e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost/boatreservationandrental/login.php',
        new URLSearchParams(formData), // Convert to URL-encoded format
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      console.log(response.data); // Debugging
  
      if (response.data.success) {
        setMessage(response.data.message);
        navigate('/home'); // Redirect on successfull login
      } else {
        setMessage(response.data.message || 'Login failed!');
      }
    } catch (error) {
      setMessage('Login failed! Check server connection.');
      console.error('Error:', error);
    }
  };
  
  

  return (
    <Container className="login-container" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="login-box">
          <h2 className="login-text">Log In</h2>
          {message && <p className="text-danger">{message}</p>}

          <Form onSubmit={handleSubmit}>
            <input
  type="email"
  className="form-control"
  name="email"
  placeholder="Enter email"
  value={formData.email}
  onChange={handleChange}
  required
  autoComplete="email"
  readOnly={false}
/>

<input
  type="password"
  className="form-control"
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  required
  autoComplete="current-password"
  readOnly={false}
/>

            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
