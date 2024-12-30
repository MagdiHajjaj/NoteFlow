import React from 'react'
import Form from "../components/Form"
import { Link } from 'react-router-dom';  
import "../styles/LogAndRegister.css";  

const Login = ({ setIsAuthenticated }) => {
  return (
    <div className="container-log">
      <div className="project-header">
        <h1>NoteFlow</h1>
        <p>Your notes, organized and accessible.</p>
      </div>

      <Form route="/api/token/" method="login" setIsAuthenticated={setIsAuthenticated} />

      <div className="login-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
