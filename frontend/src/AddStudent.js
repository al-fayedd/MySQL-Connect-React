import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mark, setMark] = useState('');
  const [city, setCity] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/create', {
        name,
        email,  // Added email here
        mark,
        city,
        grade
      });
      console.log('Response:', response.data); // Log the response data
      navigate('/'); // Redirect to the student list page
    } catch (error) {
      console.error('Failed to add student:', error.response?.data || error.message); // Log any errors
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mark</label>
          <input
            type="text"
            className="form-control"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
