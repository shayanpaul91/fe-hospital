import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '1',
    age: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateFullName = (fullName) => {
    if (!fullName) {
      return 'Full name is required';
    }
    if (fullName.length < 2) {
      return 'Full name must be at least 2 characters';
    }
    return '';
  };

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

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateAge = (age) => {
    if (!age) {
      return 'Age is required';
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return 'Please enter a valid age (1-120)';
    }
    return '';
  };

  const validateGender = (gender) => {
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };

  const validateHeight = (height) => {
    if (!height) {
      return 'Height is required';
    }
    const heightNum = parseFloat(height);
    if (isNaN(heightNum) || heightNum < 50 || heightNum > 300) {
      return 'Please enter a valid height (50-300 cm)';
    }
    return '';
  };

  const validateWeight = (weight) => {
    if (!weight) {
      return 'Weight is required';
    }
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 20 || weightNum > 500) {
      return 'Please enter a valid weight (20-500 kg)';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) {
      return 'Phone number is required';
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid phone number (10-15 digits)';
    }
    return '';
  };

  const validateAddress = (address) => {
    if (!address) {
      return 'Address is required';
    }
    if (address.length < 5) {
      return 'Address must be at least 5 characters';
    }
    return '';
  };

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    if (strength <= 2) return { strength: 33, label: 'Weak', color: '#ff4444' };
    if (strength <= 4) return { strength: 66, label: 'Medium', color: '#ffaa00' };
    return { strength: 100, label: 'Strong', color: '#44ff44' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate field on change
    let error = '';
    switch (name) {
      case 'fullName':
        error = validateFullName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        // Also revalidate confirm password if it exists
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      case 'age':
        error = validateAge(value);
        break;
      case 'gender':
        error = validateGender(value);
        break;
      case 'height_cm':
        error = validateHeight(value);
        break;
      case 'weight_kg':
        error = validateWeight(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'address':
        error = validateAddress(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    const ageError = validateAge(formData.age);
    const genderError = validateGender(formData.gender);
    const heightError = validateHeight(formData.height_cm);
    const weightError = validateWeight(formData.weight_kg);
    const phoneError = validatePhone(formData.phone);
    const addressError = validateAddress(formData.address);
    
    if (fullNameError || emailError || passwordError || confirmPasswordError || 
        ageError || genderError || heightError || weightError || phoneError || addressError) {
      setErrors({
        fullName: fullNameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        age: ageError,
        gender: genderError,
        height_cm: heightError,
        weight_kg: weightError,
        phone: phoneError,
        address: addressError
      });
      setTouched({
        fullName: true,
        email: true,
        password: true,
        confirmPassword: true,
        age: true,
        gender: true,
        height_cm: true,
        weight_kg: true,
        phone: true,
        address: true
      });
      return;
    }
    
    // Format data according to API structure
    const registrationData = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      role: parseInt(formData.role),
      user_details: {
        age: parseInt(formData.age),
        gender: formData.gender,
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        phone: formData.phone,
        address: formData.address
      }
    };
    
    console.log('Registration submitted:', registrationData);
  
    navigate('/login');
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isFormValid = 
    !errors.fullName && 
    !errors.email && 
    !errors.password && 
    !errors.confirmPassword &&
    !errors.age &&
    !errors.gender &&
    !errors.height_cm &&
    !errors.weight_kg &&
    !errors.phone &&
    !errors.address &&
    formData.fullName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.age &&
    formData.gender &&
    formData.height_cm &&
    formData.weight_kg &&
    formData.phone &&
    formData.address;

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
            className={touched.fullName && errors.fullName ? 'error' : ''}
            required
          />
          {touched.fullName && errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={touched.email && errors.email ? 'error' : ''}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
            className={touched.password && errors.password ? 'error' : ''}
            required
          />
          {formData.password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className="strength-fill" 
                  style={{ 
                    width: `${passwordStrength.strength}%`,
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
              </div>
              <span className="strength-label" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('confirmPassword')}
            className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
            required
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
          {formData.confirmPassword && !errors.confirmPassword && formData.password && (
            <span className="success-message">✓ Passwords match</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="1">Patient</option>
            <option value="2">Doctor</option>
            <option value="3">Admin</option>
          </select>
        </div>

        <h3 style={{ marginTop: '30px', marginBottom: '20px', color: '#333' }}>Personal Details</h3>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={() => handleBlur('age')}
            className={touched.age && errors.age ? 'error' : ''}
            min="1"
            max="120"
            required
          />
          {touched.age && errors.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={() => handleBlur('gender')}
            className={touched.gender && errors.gender ? 'error' : ''}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {touched.gender && errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="height_cm">Height (cm):</label>
            <input
              type="number"
              id="height_cm"
              name="height_cm"
              value={formData.height_cm}
              onChange={handleChange}
              onBlur={() => handleBlur('height_cm')}
              className={touched.height_cm && errors.height_cm ? 'error' : ''}
              step="0.1"
              min="50"
              max="300"
              required
            />
            {touched.height_cm && errors.height_cm && (
              <span className="error-message">{errors.height_cm}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="weight_kg">Weight (kg):</label>
            <input
              type="number"
              id="weight_kg"
              name="weight_kg"
              value={formData.weight_kg}
              onChange={handleChange}
              onBlur={() => handleBlur('weight_kg')}
              className={touched.weight_kg && errors.weight_kg ? 'error' : ''}
              step="0.1"
              min="20"
              max="500"
              required
            />
            {touched.weight_kg && errors.weight_kg && (
              <span className="error-message">{errors.weight_kg}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            className={touched.phone && errors.phone ? 'error' : ''}
            placeholder="Enter 10-15 digit phone number"
            required
          />
          {touched.phone && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={() => handleBlur('address')}
            className={touched.address && errors.address ? 'error' : ''}
            rows="3"
            required
          />
          {touched.address && errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login" style={{ color: '#4CAF50', fontWeight: 'bold' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;

