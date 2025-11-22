export const signupUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(user => user.email === email);
  if (exists) return { success: false, message: "User already exists" };

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Account created" };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return { success: false, message: "Invalid login" };

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  return { success: true, message: "Login successful" };
};

export const logoutUser = () => {
  localStorage.removeItem("loggedInUser");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};
