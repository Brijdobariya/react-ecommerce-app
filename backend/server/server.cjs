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
 
app.get("/data", (req, res) => {
 const sql="SELECT * FROM `customer`"
 db.query(sql,(error,result)=>{
  if (error) {
    console.log(error);
  } else {
    res.status(201).send(result);
  }
 })
});
 
app.post("/api/register", (req, res) => {
  const { username, email, password, mobile } = req.body;
  const sql = `INSERT INTO customer(username, email, password, phone) VALUES (?,?,?,?)`;
  db.query(sql, [username, email, password, mobile], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(result);
    }
  });
});
 
app.post("/product", (req, res) => {
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
 
  db.query(
    sql,
    [p_name, p_description, p_price, p_color, p_category, p_stock, p_image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json(result);
      }
    }
  );
});
 