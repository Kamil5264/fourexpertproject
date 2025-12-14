 const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
    secure: false,   // production me true
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
    }
  });  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
