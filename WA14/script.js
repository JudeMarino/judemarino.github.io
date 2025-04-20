//   // Probem 1

// const employees = [
//     {
//       firstName: "Sam",
//       department: "Tech",
//       designation: "Manager",
//       salary: 40000,
//       raiseEligible: true
//     },
//     {
//       firstName: "Mary",
//       department: "Finance",
//       designation: "Trainee",
//       salary: 18500,
//       raiseEligible: true
//     },
//     {
//       firstName: "Bill",
//       department: "HR",
//       designation: "Executive",
//       salary: 21200,
//       raiseEligible: false
//     }
//   ];


//   console.log("Problem 1");
//   console.log("Employees:", employees);
  
//   // problem 2

//   const company = {
//     companyName: "Tech Stars",
//     website: "www.techstars.site",
//     employees: employees
//   };
  
//   console.log("Problem 2");
//   console.log("Company:", company);

//   // problem 3
  
//   const newEmployee = {
//     firstName: "Anna",
//     department: "Tech",
//     designation: "Executive",
//     salary: 25600,
//     raiseEligible: false
//   };
  
//   company.employees.push(newEmployee);
  
//   console.log("Problem 3");
//   console.log("Updated Employees:", company.employees);
  
//   let totalSalary = 0;
//   company.employees.forEach(employee => {
//     totalSalary += employee.salary;
//   });
  
//   console.log("Problem 4");
//   console.log("Total Salary:", totalSalary);
  
//   // problem 5
//   function applyRaises(company) {
//     company.employees.forEach(employee => {
//       if (employee.raiseEligible) {
//         employee.salary *= 1.1;
//         employee.raiseEligible = false;
//       }
//     });
//   }
  
//   applyRaises(company);
  
//   console.log("Problem 5");
//   console.log("Employees after raises:", company.employees);
  
//   // problem 6
//   const workingFromHome = ["Anna", "Sam"];
  
//   company.employees.forEach(employee => {
//     employee.wfh = workingFromHome.includes(employee.firstName);
//   });
  
//   console.log("Problem 6");
//   console.log("working from home:", company.employees);


// Problem 1: Create JSON for each employee
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
  
  console.log("// Problem 1");
  console.log("Employees:", JSON.parse(JSON.stringify(employees))); // Clone to preserve original log
  
  // Problem 2: Create company JSON
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
  };
  
  console.log("// Problem 2");
  console.log("Company:", JSON.parse(JSON.stringify(company)));
  
  // Problem 3: Add a new employee
  const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
  };
  
  company.employees.push(newEmployee);
  
  console.log("// Problem 3");
  console.log("Updated Employees:", JSON.parse(JSON.stringify(company.employees)));
  
  // Problem 4: Calculate total salary
  let totalSalary = 0;
  company.employees.forEach(employee => {
    totalSalary += employee.salary;
  });
  
  console.log("// Problem 4");
  console.log("Total Salary:", totalSalary);
  
  // Problem 5: Apply raises
  function applyRaises(company) {
    company.employees.forEach(employee => {
      if (employee.raiseEligible) {
        employee.salary *= 1.1;
        employee.raiseEligible = false;
      }
    });
  }
  
  applyRaises(company);
  
  console.log("// Problem 5");
  console.log("Employees after raises:", JSON.parse(JSON.stringify(company.employees)));
  
  // Problem 6: Add WFH (Work From Home) status
  const workingFromHome = ["Anna", "Sam"];
  
  company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
  });
  
  console.log("// Problem 6");
  console.log("Employees with WFH status:", company.employees);