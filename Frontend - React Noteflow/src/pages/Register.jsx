import React from 'react'
import Form from "../components/Form"
import { Link } from 'react-router-dom';  
import "../styles/LogAndRegister.css"; 

const Register = () => {
  return (
    <div className="container-log">
      <div className="project-header">
        <h1>NoteFlow</h1>
        <p>Your notes, organized and accessible.</p>
      </div>

      <Form route="/api/user/register/" method="register" />

      <div className="register-link">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Register;
