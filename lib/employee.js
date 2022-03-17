class Employee {
  constructor(
    id,
    firstName,
    lastName,
    department,
    role,
    salary,
    manager = "Employee"
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.department = department;
    this.role = role;
    this.salary = salary;
    this.manager = manager;
  }

  getId() {
    return this.id;
  }

  getfirstName() {
    return this.firstName;
  }

  getlastName() {
    return this.lastName;
  }
  getRole() {
    return this.role;
  }
  getDepartment() {
    return this.department;
  }
  getSalary() {
    return this.salary;
  }
  getManager() {
    return this.manager;
  }
}

module.exports = Employee;
