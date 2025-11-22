import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email }));
    alert("Account Created Successfully!");
    history.push("/login");
  };

  // CSS as JS style objects
  const styles = {
    page: {
      height: "100vh",
      width: "100%",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1400&q=80")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    box: {
      width: "350px",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "35px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0px 5px 18px rgba(0,0,0,0.25)",
    },

    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "6px",
      border: "1px solid #aaa",
      fontSize: "16px",
    },

    button: {
      width: "100%",
      background: "#ff6b1a",
      color: "white",
      padding: "12px",
      border: "none",
      marginTop: "12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "0.3s",
    },

    buttonHover: {
      background: "#e3570e",
    },

    link: {
      color: "#0077ff",
      fontWeight: "bold",
      textDecoration: "none",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Create Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = "#e3570e")}
            onMouseOut={(e) => (e.target.style.background = "#ff6b1a")}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
