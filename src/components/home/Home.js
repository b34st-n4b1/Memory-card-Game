import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Memory Game</h1>
      <h2>Choose Difficulty Level</h2>
      <div className="btn-container">
        <Link to="/easy">
          <button className="btn">Easy</button>
        </Link>
        <Link to="/medium">
          <button className="btn">Medium</button>
        </Link>
        <Link to="/hard">
          <button className="btn">Hard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
