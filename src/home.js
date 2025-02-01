// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <h1>React Navigation</h1>
      <div>
        <button>
          <Link to="/user/shop">User</Link>
        </button>
        <button>
          <Link to="/admin/stats">Admin</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
