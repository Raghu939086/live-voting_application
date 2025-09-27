import React, { useState } from "react";
import Login from "./components/Login";
import Voting from "./components/Voting";
import Results from "./components/Results";

function App() {
  const [userName, setUserName] = useState("");
  const [view, setView] = useState("login"); // 'login', 'vote', 'results'

  const handleLogin = (name) => {
    setUserName(name);
    setView("vote");
  };

  return (
    <>
      {view === "login" && <Login onLogin={handleLogin} />}
      {view === "vote" && (
        <Voting
          userName={userName}
          onVoted={() => setView("results")}
          onShowResults={() => setView("results")}
        />
      )}
      {view === "results" && <Results />}
    </>
  );
}

export default App;
