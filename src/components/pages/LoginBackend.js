import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../services/api";
import { useHistory } from "react-router-dom";

function LoginBackend() {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      history.push("/profile");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input type="email" name="email" placeholder="Email" style={styles.input} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password" style={styles.input} onChange={handleChange} required />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#e8e8e8" },
  form: { background: "white", padding: "30px", borderRadius: "10px", width: "300px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", textAlign: "center" },
  input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid gray" },
  button: { width: "100%", padding: "12px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
};

export default LoginBackend;
