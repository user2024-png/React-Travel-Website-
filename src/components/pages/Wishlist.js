import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Wishlist() {
  const history = useHistory();
  const [wish, setWish] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Check login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please Login First!");
      history.push("/login");
    }
  }, [history]);

  // Load existing data
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // Save to localStorage
  const saveWishlist = (data) => {
    setWishlist(data);
    localStorage.setItem("wishlist", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!wish.trim()) return;

    if (editIndex !== null) {
      const updated = [...wishlist];
      updated[editIndex] = wish;
      saveWishlist(updated);
      setEditIndex(null);
    } else {
      saveWishlist([...wishlist, wish]);
    }

    setWish("");
  };

  const handleEdit = (index) => {
    setWish(wishlist[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    saveWishlist(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌍 Travel Wishlist</h2>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter destination (e.g., Paris, Dubai)"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul style={styles.list}>
        {wishlist.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editBtn}>✏ Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.deleteBtn}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline CSS (No separate CSS file needed)
const styles = {
  container: {
    width: "450px",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "10px",
    background: "#f5f7ff",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#3A4D8F",
  },
  inputBox: { display: "flex", gap: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    background: "#3A4D8F",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: { marginTop: "20px", listStyle: "none", padding: 0 },
  listItem: {
    background: "white",
    margin: "10px 0",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
  },
  editBtn: {
    marginRight: "10px",
    background: "#f4c542",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ff4b4b",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
};

export default Wishlist;
