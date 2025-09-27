import axios from "axios";
import React, { useEffect, useState } from "react";
import './style.css';


const Voting = ({ userName, onVoted, onShowResults }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/options", { withCredentials: true })
      .then((res) => setOptions(res.data))
      .catch(() => setError("Unable to load options."));
  }, []);

  function handleVote() {
    if (!selectedOption) {
      setError("Select an option to vote!");
      return;
    }
    axios
      .post(
        "http://localhost:4000/vote",
        { option: selectedOption },
        { withCredentials: true }
      )
      .then(() => onVoted())
      .catch((err) => {
  if (err.response?.data?.message === "Already voted") {
    setError("You have already voted.");
  } else {
    setError(err.response?.data?.message || "Vote failed");
  }
});
  }

  return (
    <div style={{ margin: "3rem auto", maxWidth: 400, textAlign: "center" }}>
      <div className="ribbon">Voting</div>
      <h2>Welcome, {userName}</h2>
      <h3>Make Your Choice</h3>
      <div>
        {options.map((opt) => (
          <div key={opt}>
            <input
              type="radio"
              id={opt}
              name="vote"
              value={opt}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor={opt}>{opt}</label>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 20 }} onClick={handleVote}>
        Vote
      </button>
      <button style={{ marginTop: 20, marginLeft: 10 }} onClick={onShowResults}>
        Results
      </button>
      {error && <p style={{ color: "#d33", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default Voting;
