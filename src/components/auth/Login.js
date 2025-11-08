import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuthState } from '../../store/slices/authSlice';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isLoading, isSuccess, isError, errorMessage } = useSelector((state) => state.auth);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Handle email change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({
      ...errors,
      email: validateEmail(value)
    });
  };

  // Handle password change with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: validatePassword(value)
    });
  };

  // Handle blur to mark field as touched
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  // Handle successful login
  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard');
      dispatch(resetAuthState());
    }
  }, [isSuccess, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      setTouched({
        email: true,
        password: true
      });
      return;
    }
    
    // Dispatch login action
    dispatch(loginUser({ email, password }));
  };

  const isFormValid = !errors.email && !errors.password && email && password;

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {/* Show error message from API */}
      {isError && errorMessage && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email')}
            className={touched.email && errors.email ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password')}
            className={touched.password && errors.password ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <button type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#4CAF50', fontWeight: 'bold' }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;

