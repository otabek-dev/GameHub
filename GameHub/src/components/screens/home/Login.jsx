import axios from "axios";
import { useState } from "react";

const Login = () => {

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5216/api/Login", {
        userName,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userName", response.data.userName);

      window.location.href = "/";

    } catch (err) {
      setError("Failed to login");
      console.log(error);
      console.log(err);
    }
  };

  return (
    <div>
      {error && <h3>{error}</h3>}
      <h2>Login</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
