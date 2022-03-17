// Import and require mysql2
const mysql = require("mysql2");
const { prompt } = require("inquirer");
const employee = require("./lib/employee");
const cTable = require("console.table");
const inquirer = require("inquirer");
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "MyNewPass",
    database: "management_db",
  },
  console.log(`Connected to the management_db database.`)
);

//START OFF NODE SERVER.JS

//step 1 create option menu or "welcomeMessage" with options to choose from.
const main = function () {
  inquirer
    .prompt([
      {
        message:
          "Welcome! Welcome! Sit and Stay a while Friend! Select an option:",
        type: "list",
        name: "choice",
        choices: [
          "View all Employees",
          "View all Roles",
          "View all Departments",
          "Update Employee Role",
          "Add Employee",
          "Add role",
          "Add Department",
          "Quit",
        ],
        name: "option",
      },
    ])
    .then((res) => {
      if (res.option === "View all Departments") {
        viewDep();
      } else if (res.option === "View all Roles") {
        viewRole();
      } else if (res.option === "View all Employees") {
        viewAllEmployee();
      } else if (res.option === "Add Department") {
        addDept();
      } else if (res.option === "Add role") {
        addRole();
      } else if (res.option === "Add Employee") {
        addEmp();
      } else if (res.option === "Update an employee") {
        updateEmp();
      } else {
        console.log("NO WAIT DONT GO!!");
        process.exit();
      }
    });
  //this starts the above greeting message.

  //this is meant to be if the user selects "View all Employee" then it will display using db.query for code to show in nodejs.
  const viewAllEmployee = function () {
    db.query(
      `SELECT *
FROM department
JOIN role ON department.id = department_id
JOIN employee ON role.id = role_id;`,
      function (err, res) {
        console.table(res);
        main();
      }
    );
  };
};
const viewRole = () => {
  db.query(
    `SELECT *
FROM role
JOIN department ON department.id = department_id;`,
    function (err, res) {
      console.table(res);
      main();
    }
  );
};

const viewDep = () => {
  db.query(`SELECT * FROM department`, function (err, res) {
    console.table(res);
    main();
  });
};

const addDept = function () {
  inquirer
    .prompt([
      {
        message: "Add a new department name:",
        type: "input",
        name: "newDeptName",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      db.query(
        `INSERT INTO department SET ?`,
        {
          name: answers.newDeptName,
        },
        function (error) {
          if (error) throw error;
          console.log("Added a New Department! GREAT JOB!");
        }
      );
      viewDep();
    });
};

const addEmp = function () {
  inquirer
    .prompt([
      {
        message: "First Name:",
        type: "input",
        name: "firstName",
      },
      {
        message: "Last Name:",
        type: "input",
        name: "lastName",
      },
      {
        message: "Role ID:",
        type: "number",
        name: "role_id",
      },
      {
        message: "Manager ID:",
        type: "number",
        name: "manager_id",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      db.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        function (error) {
          if (error) throw error;
          console.log("$$$$NEW EMPLOYEE ADDED$$$$$");
        }
      );
      main();
    });
};

const addRole = function () {
  inquirer
    .prompt([
      {
        message: "Enter Title:",
        type: "input",
        name: "newTitle",
      },
      {
        message: "Salary:",
        type: "number",
        name: "newSalary",
      },
      {
        message: "Department ID: (1)Admin (2)Manager (3)Employee (4)Free Lance",
        type: "number",
        name: "department_id",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      db.query(
        `INSERT INTO role SET ?`,
        {
          salary: answers.newSalary,
          title: answers.newTitle,
          id: answers.addRole,
          department_id: answers.department_id,
        },
        function (error) {
          if (error) throw error;
          console.log("Wonderful, YOU added a NEW ROLE!");
        }
      );
      main();
    });
};

const updateEmp = function () {
  db.query(`SELECT first_name, employee_id FROM employee`, (err, res) => {
    if (err) {
      console.log(err);
    }
    let emptyArr = [];
    for (let i = 0; i < res.length; i++) {
      emptyArr.push({
        name: res[i].first_name,
        value: res[i].employee_id,
      });
    }
    console.log(emptyArr);
    inquirer
      .prompt([
        {
          type: "list",
          message: "who would you like to update?",
          name: "userChoice",
          choices: "userChoice",
        },
        {
          type: "input",
          name: "firstName",
          message: "First name?:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Last name?:",
        },
        {
          type: "number",
          name: "roleID",
          message: "Role ID:",
        },
        {
          type: "number",
          name: "managerID",
          message: "Manager ID:",
        },
      ])
      .then(function (answers) {
        console.log(answers);
        db.query(
          `UPDATE employee SET ? WHERE employee_id${answers.userChoice}`,
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleID,
            manager_id: answers.managerID,
          },
          function (error) {
            if (error) throw error;
            console.log("Employee updated!");
          }
        );
        main();
      });
  });
};

main();
