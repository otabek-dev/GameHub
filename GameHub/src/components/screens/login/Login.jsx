import axios from "axios";
import { useState } from "react";
import styles from "./login.module.css";

const Login = () => {

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    try {
      if (userName.length < 1) {
        setError("Please enter a username with at least 1 character");
        return;
      }
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
    <div className={styles.container}>
      <div className={styles.form}>
        {error && <h3 className={styles.error}>{error}</h3>}
        <h2>Welcome to GameHUB</h2>
        <div className="">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className="form-control my-3"
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
      
    </div>
  );
};

export default Login;
