import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-message">Oops! Page not found.</h2>
        <p className="not-found-text">Sorry, the page you were looking for doesn't exist.</p>
        <Link to="/" className="not-found-link">
          <button className="not-found-button">Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
