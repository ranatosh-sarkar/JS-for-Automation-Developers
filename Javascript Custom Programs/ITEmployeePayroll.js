// 1. Class and 2. Constructor
class Employee {
  // 11. Access Specifiers: Using # for private fields (ES2022+)
  #name;
  #salary;

  constructor(id, name, role, baseSalary) {
      this.id = id; // public
      this.#name = name; 
      this.role = role;
      this.#salary = baseSalary;
  }

  // 10. Getters and Setters
  get name()   { return this.#name; }
  get salary() { return this.#salary; }

  setName(newName) {
      if (newName.length < 2) throw new Error("Name too short");
      this.#name = newName;
  }

  setSalary(amount) {
    // If the salary is negative, throw an error and stop running the function.
      if (amount < 0) throw new Error("Invalid salary amount");
    // If not, execute the next line
      this.#salary = amount;
  }

  // 4. Methods
  calculateBonus() {
      return this.#salary * 0.1;
  }

  // 12. this Keyword
  displayInfo() {
      console.log(`Employee ${this.#name} (${this.role}) with id ${this.id} earns ${this.#salary}`);
  }

  // 13. Static Methods
  static companyName() {
      return "EY";
  }
}

// Debugging via console.log()
console.log("=== EXISTING EMPLOYEE DETAILS ===");
// 3. Object with values to existing property post-creation
//variable emp1 will always point to the same object
const emp1 = new Employee(101, "Alan", "Developer", 60000);
// can’t reassign the whole variable
//emp1 = new Employee(102, "Bob", "Tester", 50000); // ❌ ERROR
console.log("Before Addition of Dynamic property",emp1);
// name and salary are private (hidden), it does assign the values correctly 
// to the private variables but only accessible via getter/setters
emp1.department = "Engineering"; // dynamic property addition
console.log("After Addition of Dynamic property",emp1);
console.log("Calling displayInfo()-->");
emp1.displayInfo();
// console.log(`name= ${emp1.#name}, salary= ${emp1.#salary}`); -- not possible because of private fields
// emp1.#name = "Alan Collins"; emp1.#salary = 80000;  -- not possible because of private fields
console.log("=== SETTING NEW EMPLOYEE DETAILS AFTER PROMOTION===");
// Exception Handling (throw, try, catch)
try {
      emp1.setName("A");
    } catch (e) {
      console.error("Caught Error (name):", e.message);
    }
try {
      emp1.setSalary(-1);
    } catch (e) {
      console.error("Caught Error (salary):", e.message);
    }
emp1.setName("Alan");
emp1.setSalary(80000);
console.log("Access Employee new name-> ", emp1.name);
console.log("Access Employee new salary-> ", emp1.salary);
emp1.id=1001; emp1.role="Manager"; emp1.department="Technical Management";
emp1.displayInfo();
console.log("Accessing Object properties");
console.log(`id= ${emp1.id}, role= ${emp1.role}, department= ${emp1.department}`);

// 5. Encapsulation is shown through getters/setters and private fields
// 6. Abstraction is implemented by hiding internal salary fields via private (#salary)
// 7. Inheritance
class Manager extends Employee {
  constructor(id, name, baseSalary, department, teamSize) {
    super(id, name, "Manager", baseSalary);
    this.department = department;
    this.teamSize = teamSize;
  }

  // 8. Polymorphism (method overriding)
  calculateBonus() {
    return this.salary * 0.2 + this.teamSize * 100;
  }

  // its own functionality
  approveLeave() {
    console.log(`Designated ${this.role} ${this.name} can approve leaves.`);
  }
}

const mgr1 = new Manager(1001, "Bradely", 80000, "Technical Management", 30);

console.log("----Manager Details----");
mgr1.displayInfo();
console.log(mgr1);

mgr1.setName("Bradely Cooper");
mgr1.department = "Business Management";
console.log("Updated Department--", mgr1.department);
console.log("Manager Name--", mgr1.name);
console.log("Bonus--", mgr1.calculateBonus());
mgr1.approveLeave();

//you can’t declare a classic “constructor function + its prototype” inside a class body (prototype is always outside)
//But you can attach a 'prototype method' as a property on Manager after the class is defined, 
//below is an instance method adding to Manager 
Manager.prototype.assignProject = function (project) {
  this.project = project; // sets an own (per-instance) property, not a shared one                  
  console.log(`Manager ${this.name} is assigned to: ${project}`);
};

mgr1.assignProject("Apollo");
console.log(`Manager's new project: ${mgr1.project}`);

// 9. Prototype?? --> in JS, every function and object has its own property called prototype
//problem* usual way of adding new property, this is only applicable to a specific object

const intern1 = { firstName: "Elon" , lastname: "Musk"};
intern1.role = "Internship";
console.log(`Intern 1 Name: ${intern1.firstName} ${intern1.lastname}, role: ${intern1.role}`);

// we can use the prototype to add new properties and methods to a 'constructor function' without changing 
// existing code. ALL objects inherits the properties and methods from a prototype
// 9. Prototype-based Inheritance
function Intern(id, name) {
  this.id = id;
  this.name = name;
}

//.stipend is the shared property stored on the prototype, it's shared by every Intern object
Intern.prototype.stipend = 1000;
//getInfo is the property name also a method (function) stored on the prototype
Intern.prototype.getInfo = function () {
  return `Intern ${this.name}, stipend: ${this.stipend}`;
};

//new keyword makes the Intern function into a constructor
//constructor function can be created on its prototype without declaring a class
const intern2 = new Intern(302, "Bob");
console.log(intern2.getInfo());

Intern.prototype.stipend = 2000;
const intern3 = new Intern(303, "Marley");
console.log(intern3.getInfo());

const intern4 = new Intern(304, "Maverick");
console.log(intern4.getInfo()); // reads current stipend value

// 14. function declared outside class with return keyword
function getAnnualCost(employee) {
  return employee.salary * 12;
}

// Async/Await – simulate salary processing (async is a promise of returning something else undefined)
async function processPayroll(employee) {
  console.log("Processing payroll for", employee.name);
  return new Promise((resolve) => {//explicitly return new Promise('resolve'-function you call 2 fulfill the promise with a value)
      setTimeout(() => {
          const netYearlyPay = getAnnualCost(employee) + employee.calculateBonus();
          resolve(netYearlyPay);
      }, 1000);
  });
}

async function runPayroll(employee) {
  try {
      const amount = await processPayroll(employee);
      console.log("Net Yearly Pay:", amount);
  } catch (error) {
      console.error("Payroll processing failed:", error.message);
  }
}

runPayroll(emp1); // run async function
