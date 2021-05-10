import React from "react";
import { Link } from "react-router-dom";
import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <p>The page you are looking for does not exist</p>
        <p><Link to="/">Return to Dashboard</Link></p>
      </div>
    </>
  )
}

export default NotFound;