// prob 1
const employees = [
    {
      firstName: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true
    },
    {
      firstName: "Mary",
      department: "Finance",
      designation: "Trainee",
      salary: 18500,
      raiseEligible: true
    },
    {
      firstName: "Bill",
      department: "HR",
      designation: "Executive",
      salary: 21200,
      raiseEligible: false
    }
  ];
  
  console.log("Problem 1");
  console.log("Employees:", JSON.parse(JSON.stringify(employees)));
  
  // prob 2
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
  };
  
  console.log("Problem 2");
  console.log("Company:", JSON.parse(JSON.stringify(company)));
  
  // prob 3
  const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
  };
  
  company.employees.push(newEmployee);
  
  console.log("Problem 3");
  console.log("Updated Employees:", JSON.parse(JSON.stringify(company.employees)));
  
  // prob 4
  let totalSalary = 0;
  company.employees.forEach(employee => {
    totalSalary += employee.salary;
  });
  
  console.log("Problem 4");
  console.log("Total Salary:", totalSalary);
  
  // prob 5
  function applyRaises(company) {
    company.employees.forEach(employee => {
      if (employee.raiseEligible) {
        employee.salary *= 1.1;
        employee.raiseEligible = false;
      }
    });
  }
  
  applyRaises(company);
  
  console.log("Problem 5");
  console.log("Employees after raises:", JSON.parse(JSON.stringify(company.employees)));
  
  // prob 6
  const workingFromHome = ["Anna", "Sam"];
  
  company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
  });
  
  console.log("Problem 6");
  console.log("Working from home:", company.employees);