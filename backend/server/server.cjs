const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// JSON Web Token
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  connectionLimit: 10, // Maximum number of connections in the pool
});

// Generating JSON Web Token with private key
const token = jwt.sign({ foo: "bar" }, process.env.JWT_PRIVATE_KEY);

app.get("/api/data", async (req, res) => {
  const sql = "SELECT * FROM `customer`";
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, result) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          res.status(500).send({ err });
        } else {
          res.status(200).send(result);
        }
      });
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/api/p-add", async (req, res) => {
  const sql = "SELECT * FROM `product`";
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(sql, (err, result) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          res.status(500).send({ err });
        } else {
          res.status(200).send(result);
        }
      });
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password, mobile } = req.body;
  const sql = `INSERT INTO customer(username, email, password, phone, token) VALUES (?,?,?,?,?)`;
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        sql,
        [username, email, password, mobile, token],
        (err, result) => {
          connection.release(); // Release the connection back to the pool
          if (err) {
            res.status(500).send({ err });
          } else {
            res.status(201).send({ result });
          }
        }
      );
    });
    console.log(sql);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// Import Multer for file upload
const multer = require("multer");
const path = require("path");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

// Route for handling product creation with image upload
app.post(
  "/api/product",
  upload.array("p_image"),
  async (req, res) => {
    const { p_name, p_description, p_price, p_color, p_category, p_stock } =
      req.body;

    // Convert the color array to a comma-separated string
    const colorString = Array.isArray(p_color) ? p_color.join(",") : p_color;

    // Access the uploaded files through req.files
    const files = req.files;

    const sql =
      "INSERT INTO `product`(`p_title`, `p_description`, `p_price`, `P_category`, `p_stock`, `p_color`, `p_image`) VALUES (?,?,?,?,?,?,?)";

    try {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(
          sql,
          [
            p_name,
            p_description,
            p_price,
            p_category,
            p_stock,
            colorString,
            files.map((file) => file.filename).join(","), // Convert file names to comma-separated string
          ],
          (err, result) => {
            connection.release();
            if (err) {
              console.error(err);
              res.status(500).send({ error: "Internal Server Error" });
            } else {
              res.status(201).send({ result, files: files.map((file) => file.filename) });
            }
          }
        );
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => console.log("Connected...", PORT));