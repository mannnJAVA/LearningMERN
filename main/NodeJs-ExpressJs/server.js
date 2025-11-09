const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// In-memory user storage (for demo; replace with DB)
let users = [
  { email: "test@example.com", password: "password123", name: "Test User" }, // Example user
];

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Route for contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Route for login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Route for signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// POST route for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    req.session.user = user; // Store user in session
    res.redirect("/dashboard"); // Redirect to dashboard
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>'); // Basic error; improve with flash messages
  }
});

// POST route for signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    res.send('User already exists. <a href="/signup">Try again</a>');
  } else {
    users.push({ name, email, password }); // Add to in-memory storage
    req.session.user = { name, email }; // Log them in
    res.redirect("/dashboard");
  }
});

// Route for dashboard (protected)
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect if not logged in
  }
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
