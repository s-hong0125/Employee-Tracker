INSERT INTO department(dept_name)
VALUES
("Administration"),
("Finance"),
("HR"),
("IT"),
("Sales");

INSERT INTO roles(title, salary,department,department_id)
VALUES
("Admin Officer", 65000, "Administration",1),
("Admin Manager", 80000, "Administration",1),
("Assistant Accountant", 60000, "Finance",2),
("CFO", 100000, "Finance", 2),
("HR Manager", 80000, "HR", 3),
("IT Manager", 90000, "IT", 4),
("Sales Officer", 60000, "Sales", 5),
("Sales Manager", 85000, "Sales", 5);


INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUES
("Remi", "Cordova", 1, NULL ),
("Luna", "Fritz", 1 , NULL),
("Yassin", "Alfaro",2 , NULL),
("Catriona", "Gough", 2 , NULL),
("Cerys", "Waller", 3, NULL),
("Ian", "Mcdermott", 4, NULL),
("Devonte", "Sadler", 5, NULL),
("Eshaan", "Soto", 5, NULL),
("Isla-Rae", "Rigby", 1, NULL),
("Paul", "Griffith", 5, NULL);
