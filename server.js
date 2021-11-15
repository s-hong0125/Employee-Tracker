const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection  = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root123",
    database: "employees_db"
});

connection.connect(function(err) {
if (err) throw err;
mainPage();
});

function mainPage() {
    inquirer
    .prompt({
      type:'list',
      name:'questions',
      message:'What would you like to do?',
      choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a departmnet",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit"
        ]
    }).then(function (answer) {
        switch(answer.questions) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a departmnet":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee role":
            updateEmployeeRole();
            break;
        case "Exit":
            exitCommand();
            break;
        }
    });
}

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        mainPage();
    });
}

function viewRoles() {
    let query = "SELECT * FROM roles";
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        mainPage();
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        mainPage();
    });  
}

function addDepartment() {
    inquirer
    .prompt({
        type: "input",
        name:"addDept",
        message: "Please enter the name of the department",
        })    
    .then(function (res) {
        const newDept = res.addDept;
        const query = `INSERT INTO department (dept_name) VALUES ("${newDept}")`;
        connection.query(query, function (err,res) {
            if (err) {
                throw err;
               }
               console.table(res);
               mainPage();        
        }); 
    });
}

function addRole() {
    inquirer
    .prompt([
        {
          type: "input",
          name: "addTitle",
          message: "Please enter the title of role"  
        },
        {
          type: "input",
          name:"addSalary",
          message: "Please enter the salary of this role"
        },
        {
          type: "input",
          name:"deptAdd",
          message: "Please enter the department the role belongs to"
        }
    ])
    .then(function (res) {
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: res.addTitle,
                salary: res.addSalary,
                department: res.deptADD,
            },
            function(err) {
                if (err) throw err;
                console.table(res);
                mainPage();
            });
    });
}

function addEmployee() {
    let roleArray = [];
    let managerArray = [];
    
    connection.query('SELECT * FROM roles',(err,results)=> {
        if (err) throw err;

    connection.query('SELECT * FROM employee', (err ,resultsB)=>{
        if (err) throw err;
    
    
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the first name of the employee"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the last name of the employee"
        },
        {
            type: "list",
            name: "employeeRole",
            message: "Please enter the role of the employee",
            choices: function () {
                for (let i = 0 ; i < results.length; i++) {
                    roleArray.push(results[i].title)
                }
                return roleArray;
            },
        },
        {
            type: "list",
            name: "managerID",
            message: "Please enter the name of the employee's manager",
            choices: function () {
                for (let j = 0; j < resultsB.length; j++ ){
                    managerArray.push(resultB[j].first_name);    
                }
                return managerArray;
            },
        },
    ])
    .then((answer)=> {
        let IdManager = managerArray.indexOf(answer.managerID) + 1;
        let roleID = roleArray.indexOf(answer.employeeRole) + 1;
        let qry = "INSERT INTO employee(first_name, last_name, roles_id, manager_id) VALUES( ?, ?, ?, ?)";
        connection.query (qry, [answer.firstName, answer.lastName, roleID, managerID], (err, reuslts) => {
            if (err) throw err;
            console.log("Employee added");
            viewEmployees();
        });
        mainPage(); 
    });
  });
});
}

function updateEmployeeRole() {
    inquirer
    .prompt ([
        {
            type: "input",
            name: "updateEmployeeID",
            message: "Please enter the employee's ID you want to update"
        },
        {
            type: "input",
            name: "updateRoleID",
            message: "Please enter the updated role ID of employee"  
        },
    ])
    .then(function(result) {
        const updateEmployeeID = result.updateEmployeeID;
        const updateRoleID = result.updateRoleID;
        const updateQuery = `UPDATE employee SET roles_id = "${updateRoleID}" WHERE id = "${updateEmployeeID}"`;
        connection.query(updateQuery, function (err,result){
            if (err) {
                throw err;
            }
            console.table(result);
            mainPage();
        })
    });
}

function exitCommand() {
    connection.end();
}