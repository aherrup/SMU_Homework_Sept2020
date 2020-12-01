--List the following details of each employee: employee number, last name, first name, sex, and salary.
SELECT 
	E.emp_num,E.first_name,E.last_name, E.sex,S.Salary
FROM 
	"Employees" AS E
JOIN "Salaries" AS S ON 
	S.emp_num=E.emp_num;

--List first name, last name, and hire date for employees who were hired in 1986.
SELECT 
	first_name,last_name,hire_date
FROM
	"Employees"
WHERE
	hire_date BETWEEN '1986-01-01' AND '1986-12-31';


--List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.
SELECT 
	D.dept_num,D.dept_name,DM.emp_num,E.first_name,E.last_name
FROM
	"Departments" AS D
JOIN "Department_Manager" AS DM ON 
	DM.dept_num = D.dept_num
JOIN "Employees" AS E ON 
	DM.emp_num=E.emp_num;	

	
--List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT 
	E.emp_num,E.last_name,E.first_name,D.dept_name
FROM
	"Employees" AS E
JOIN "Department_Employees" AS DE ON
	DE.emp_num=E.emp_num
JOIN "Departments" AS D ON
	D.dept_num=DE.dept_num;

	
--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT 
	first_name,last_name,sex
FROM
	"Employees"
WHERE
	first_name='Hercules' AND
	last_name LIKE 'B%';


--List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT 
	E.emp_num,E.first_name,E.last_name,D.dept_name
FROM
	"Employees" AS E
JOIN "Department_Employees" AS DE ON
	DE.emp_num=E.emp_num
JOIN "Departments" AS D ON
	D.dept_num=DE.dept_num
WHERE
	D.dept_name='Sales';

	
--List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT 
	E.emp_num,E.first_name,E.last_name,D.dept_name
FROM
	"Employees" AS E
JOIN "Department_Employees" AS DE ON
	DE.emp_num=E.emp_num
JOIN "Departments" AS D ON
	D.dept_num=DE.dept_num
WHERE
	D.dept_name='Sales' OR
	D.dept_name='Development';


--In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT 
	last_name,
COUNT(*)
FROM
	"Employees"
GROUP BY 
	last_name
ORDER BY 
	COUNT(*) DESC;
