DROP TABLE "Departments";
DROP TABLE "Department_Employees";
DROP TABLE "Employees";
DROP TABLE "Department_Manager";
DROP TABLE "Salaries";
DROP TABLE "Titles";

CREATE TABLE "Departments" (
    "dept_num" varchar(10)   NOT NULL,
    "dept_name" varchar(100)   NOT NULL,
    CONSTRAINT "pk_Departments" PRIMARY KEY (
        "dept_num"
     )
);

CREATE TABLE "Department_Employees" (
    "emp_num" int   NOT NULL,
    "dept_num" varchar(10)   NOT NULL
);

CREATE TABLE "Department_Manager" (
    "emp_num" int   NOT NULL,
    "dept_num" varchar(10)   NOT NULL
);

CREATE TABLE "Employees" (
    "emp_num" int   NOT NULL,
    "emp_title" varchar(30)   NOT NULL,
    "birth_date" date   NOT NULL,
    "first_name" varchar(50)   NOT NULL,
    "last_name" varchar(50)   NOT NULL,
    "sex" varchar(1)   NOT NULL,
    "hire_date" date   NOT NULL,
    CONSTRAINT "pk_Employees" PRIMARY KEY (
        "emp_num"
     )
);

CREATE TABLE "Salaries" (
    "emp_num" int   NOT NULL,
    "salary" int   NOT NULL
);

CREATE TABLE "Titles" (
    "emp_title" varchar(30)   NOT NULL,
    "title" varchar(100)   NOT NULL,
    CONSTRAINT "pk_Titles" PRIMARY KEY (
        "emp_title"
     )
);

ALTER TABLE "Department_Employees" ADD CONSTRAINT "fk_Department_Employees_emp_num" FOREIGN KEY("emp_num")
REFERENCES "Employees" ("emp_num");

ALTER TABLE "Department_Employees" ADD CONSTRAINT "fk_Department_Employees_dept_num" FOREIGN KEY("dept_num")
REFERENCES "Departments" ("dept_num");

ALTER TABLE "Department_Manager" ADD CONSTRAINT "fk_Department_Manager_emp_num" FOREIGN KEY("emp_num")
REFERENCES "Employees" ("emp_num");

ALTER TABLE "Department_Manager" ADD CONSTRAINT "fk_Department_Manager_dept_num" FOREIGN KEY("dept_num")
REFERENCES "Departments" ("dept_num");

ALTER TABLE "Employees" ADD CONSTRAINT "fk_Employees_emp_title" FOREIGN KEY("emp_title")
REFERENCES "Titles" ("emp_title");

ALTER TABLE "Salaries" ADD CONSTRAINT "fk_Salaries_emp_num" FOREIGN KEY("emp_num")
REFERENCES "Employees" ("emp_num");
