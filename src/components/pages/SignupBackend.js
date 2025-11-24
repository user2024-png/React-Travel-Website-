import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../services/api";
import { useHistory } from "react-router-dom";

function SignupBackend() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      alert(response.data.message);
      history.push("/login-backend");
    } catch (error) {
      alert("Signup Failed, Try again!");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} required />

        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={styles.input} required />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} style={styles.input} required />

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f0f0" },
  form: { background: "white", padding: "30px", borderRadius: "10px", width: "300px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", textAlign: "center" },
  input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid gray" },
  button: { width: "100%", padding: "12px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
};

export default SignupBackend;
