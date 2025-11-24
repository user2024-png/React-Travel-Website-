import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UserProfile() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      history.push("/backend-login");
      return;
    }

    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("Session expired. Login again.");
        localStorage.removeItem("authToken");
        history.push("/backend-login");
      });
  }, [history, token]);

  const logout = () => {
    localStorage.removeItem("authToken");
    alert("Logged Out");
    history.push("/");
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.box}>
          <h2>Welcome, {user.email}</h2>
          <button style={styles.button} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "300px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "18px",
    background: "red",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
  },
};

export default UserProfile;
