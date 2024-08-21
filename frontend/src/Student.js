import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link for navigation

function Student() {
  const [students, setStudents] = useState([]); 

  useEffect(() => {
    axios
      .get('http://localhost:3001/')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/student/${id}`);
      setStudents(students.filter(student => student.id !== id)); // Remove the deleted student from the state
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };
  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success mb-3">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mark</th>
              <th>City</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mark}</td>
                <td>{student.city}</td>
                <td>{student.grade}</td>
                <td>
                  <Link to={`/update/${student.id}`} className="btn btn-warning">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
