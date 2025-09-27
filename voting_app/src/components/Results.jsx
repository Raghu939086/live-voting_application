import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './style.css';


const socket = io("http://localhost:4000", { withCredentials: true });

const Results = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/results")
      .then((res) => setResults(res.data))
      .catch(() => setResults({}));

    socket.on("votesUpdated", (votes) => {
      setResults(votes);
    });
    return () => {
      socket.off("votesUpdated");
    };
  }, []);

  return (
    <div style={{ margin: "3rem auto", maxWidth: 400, textAlign: "center" }}>
       <div className="ribbon">Voting</div>
      <h2>Live Results</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(results).map(([option, count]) => (
          <li key={option} style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
            {option}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
