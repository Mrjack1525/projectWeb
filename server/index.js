const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const authorizeRole = require("./authorizeRole");

const JWT_SECRET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";  

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI =
  "mongodb+srv://2300032113:Kiran252006@cluster0.lgwaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Unable to connect to MongoDB Atlas: " + error));

// Middleware for Protected Routes
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Register User (Hash Password)
app.post("/users", async (req, res) => {
  try {
    const { name, email, phone, password, confirmpassword, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmpassword, salt);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      confirmpassword: hashedConfirmPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "Inserted data successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login User & Generate JWT Token
app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log("test1")
      if (!user) {
          console.log("test2")
          return res.status(400).json({ message: "Invalid email or password" });
      }
      console.log("test3")
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("test4")
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
      }
      const token=jwt.sign({id: user.id, email: user.email, role: user.role}, JWT_SECRET, 
          {expiresIn: "1h"},);
      console.log("test5")
      res.status(200).json({ message: "Login successful", token });
      console.log("test6")
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});



app.get("/admin", authMiddleware, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin!" });
});

app.get("/user-dashboard", authMiddleware, authorizeRole("user", "admin"), (req, res) => {
  res.json({ message: "Welcome user!" });
});


// Get All Users
app.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update User (with Password Hashing)
app.put("/updateUsers/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const { name, email, phone, password, confirmpassword, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmpassword, salt);

    const updateUsers = await User.findByIdAndUpdate(
      userid,
      { name, email, phone, password: hashedPassword, confirmpassword: hashedConfirmPassword, role },
      { new: true, runValidators: true }
    );

    if (!updateUsers) {
      return res.status(400).json({ message: "User not found to update" });
    }

    res.status(200).json({ message: "Updated user successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const deleteuser = await User.findByIdAndDelete(userid);
    if (!deleteuser) {
      return res.status(404).json({ message: "User not found to delete" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Profile (Protected Route)
app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Home Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Express</h1>");
});

app.get("/home", (req, res) => {
  res.send("<h1>Welcome to Home page</h1>");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});