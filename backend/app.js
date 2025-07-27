import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
const DB_NAME = process.env.DB_NAME || "announcements_db";

// ✅ Create MySQL connection (no DB yet)
const basePool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let pool; // will hold the actual DB connection

// ✅ Ensure Database & Table
async function initDatabase() {
  const conn = await basePool.getConnection();

  // 1️⃣ Create DB if not exists
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  console.log(`✅ Database '${DB_NAME}' ensured`);

  conn.release();

  // 2️⃣ Now connect to that DB
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // 3️⃣ Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS announcements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(100) NOT NULL,
      description JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  const conn2 = await pool.getConnection();
  await conn2.query(createTableQuery);
  conn2.release();
  console.log("✅ Table 'announcements' ensured");
}

// ✅ CRUD Routes (use `pool` after init)
app.get("/announcements", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM announcements");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/announcements/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM announcements WHERE id=?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/announcements", async (req, res) => {
  try {
    const { title, type, description } = req.body;
    if (!title || !type || !description)
      return res.status(400).json({ error: "Missing fields" });

    const [result] = await pool.query(
      "INSERT INTO announcements (title, type, description) VALUES (?, ?, ?)",
      [title, type, JSON.stringify(description)]
    );

    res.json({ id: result.insertId, title, type, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/announcements/:id", async (req, res) => {
  try {
    const { title, type, description } = req.body;
    const [result] = await pool.query(
      "UPDATE announcements SET title=?, type=?, description=? WHERE id=?",
      [title, type, JSON.stringify(description), req.params.id]
    );
    if (!result.affectedRows)
      return res.status(404).json({ error: "Not found" });
    res.json({ id: req.params.id, title, type, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/announcements/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM announcements WHERE id=?", [
      req.params.id,
    ]);
    if (!result.affectedRows)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Start server only after DB init
const PORT = process.env.PORT || 5000;
initDatabase().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
