import React from "react";

function App() {
  return (
    <div className="App">
      <a href="http://localhost:3001/auth/google">Login</a>
      <br />
      <a href="http://localhost:3001/auth/logout">Logout</a>
      <div class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
    </div>
  );
}

export default App;
