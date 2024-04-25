const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(PORT, () => console.log("connected...", PORT));
  }
});

app.get("/", (req, res) => {
  res.send("hello ok");
});

app.post;
