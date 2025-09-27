import React, { useState } from "react";
import './style.css';


const Login = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: 100 }}>
       <div className="ribbon">Voting</div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button type="submit">Login</button>
    </form>
  );
  
};

export default Login;
