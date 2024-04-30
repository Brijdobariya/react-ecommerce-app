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
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/api/product", async (req, res) => {
  const {
    p_name,
    p_description,
    p_price,
    p_color,
    p_category,
    p_stock,
    p_image,
  } = req.body;
  const sql =
    "INSERT INTO `product`(`p_name`, `p_description`, `p_price`, `P_category`, `p_stock`, `p_image`, `p_color`) VALUES (?,?,?,?,?,?,?)";
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        sql,
        [p_name, p_description, p_price, p_color, p_category, p_stock, p_image],
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
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => console.log("Connected...", PORT));
