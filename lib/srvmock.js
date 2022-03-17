const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const { prompt } = require("inquirer");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const employee = require("./lib/employee");

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "MyNewPass",
    database: "management_db",
  },
  console.log(`Connected to the management_db database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

