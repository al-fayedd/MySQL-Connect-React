import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './Student';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/create" element={<AddStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
