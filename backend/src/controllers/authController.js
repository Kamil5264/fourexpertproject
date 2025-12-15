 const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1️ Required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Name, email and password are required",
    });
  }

  // 2️ Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      code: "INVALID_EMAIL",
      message: "Please enter a valid email address",
    });
  }

  // 3️ Password length
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      code: "WEAK_PASSWORD",
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    // 4️ Check duplicate email
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        code: "EMAIL_EXISTS",
        message: "Email already registered",
      });
    }

    // 5️ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6 Insert user
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: result.insertId,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "Internal server error",
    });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

     res.cookie("token", token, {
    httpOnly: true,
    secure: false,   
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

 return res.json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    "token":token
  });  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


 

