

// Function to get all registered users from localStorage
export const getAllUsers = () => {
  const usersJSON = sessionStorage.getItem("users");
  return usersJSON ? JSON.parse(usersJSON) : [];
};

// Function to check if a user with a given user name already exists
export const isUserRegistered = (userName, password) => {
  const users = getAllUsers();
  return users.some(
    (user) => user.username === userName && user.password === password
  );
};

// Function to register a new user
export const registerUser = (user) => {
  const users = getAllUsers();
  users.push(user);
  sessionStorage.setItem("users", JSON.stringify(users));
};

export const findUser = (username) => {
  const storedUsers = JSON.parse(sessionStorage.getItem("users")) || [];
  const userFound = storedUsers.find((user) => user.username === username);
  return userFound;
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is zero-based, so we add 1
  const day = today.getDate();

  // Format month and day to have leading zero if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Create a string representation of today's date in YYYY-MM-DD format
  const todayDateString = `${formattedDay}/${formattedMonth}/${year}`;
  return todayDateString;
};

export const passwordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const passwordStrength = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return hasUppercase && hasLowercase && hasNumber && hasMinLength;
};

export const serverURL = "http://localhost:8080";

