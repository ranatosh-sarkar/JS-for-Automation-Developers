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
const emp1 = new Employee(101, "Alan", "Developer", 6500);
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
emp1.setName("Alan Collins");
emp1.setSalary(7500);
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

const mgr1 = new Manager(1001, "Bradely", 7500, "Technical Management", 30);

console.log("----Manager Details----");
mgr1.displayInfo();
console.log(mgr1);

mgr1.setName("Bradely Cooper");
mgr1.setSalary(8500);
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

const intern1 = { firstName: "Elon" , lastname: "Musk", id: 301};
intern1.role = "Internship";
console.log(`Intern 1 Name: ${intern1.firstName} ${intern1.lastname}, role: ${intern1.role}, id: ${intern1.id}`);

// we can use the prototype to add new properties and methods to a 'constructor function' without changing 
// existing code. ALL objects inherits the properties and methods from a prototype
// 9. Prototype-based Inheritance (to demonstrate inheritance Intern should extend Employee)
// Using class here is REQUIRED to access Employee's #private fields safely
class Intern extends Employee {
  constructor(id, name) {
    super(id, name, "Intern", 0);
  }
}

// Intern's own property 
Intern.prototype.stipend = 1000; //stored on the prototype (shared by every Intern object)

Intern.prototype.getInfo = function () { //getInfo is the property name also a method (function) stored on the prototype
  // Uses Employee getter `name` (no public field needed)
  return `Intern ${this.name}, stipend: ${this.stipend}`;
};

//GK note - constructor function can be created on its prototype without declaring a class using 'new' keyword which can turn a function into a constructor

//new keyword makes the Intern class create a real Employee instance (with private fields)
const intern2 = new Intern(302, "Bob");
console.log(`Second Intern: ${intern2.getInfo()}`);

Intern.prototype.stipend = 2000;
const intern3 = new Intern(303, "Tony");
console.log(`Third intern: ${intern3.getInfo()}`);
intern3.displayInfo(); // this works because intern objects truly has Employee's #private fields

const intern4 = new Intern(304, "Maverick");
console.log(`Fourth intern: ${intern4.getInfo()}`); // reads current stipend value
intern4.displayInfo();

// 14. function declared outside class with return keyword
function getAnnualCost(employee) {
  return employee.salary * 12;
}

// Async – simulate salary processing (async is a promise of returning something else undefined)
//Promise (async operation like network / waiting / actions on browser [like reading text, etc])
async function processPayroll(employee) {
  console.log("Processing payroll for", employee.name);
  return new Promise((resolve) => {//explicitly return new Promise('resolve'-function you call to fulfill the promise with a value)
      setTimeout(() => {
          const netYearlyPay = getAnnualCost(employee) + employee.calculateBonus();
          resolve(netYearlyPay);
      }, 1000);
  });
}

async function runPayroll(employee) {
  try {
      const totalAnnualPayout = 
      await processPayroll(employee);//Pause this async function using await until the Promise is finished and gets resolved value else displays { <pending> }
      console.log("Net Yearly Pay:", totalAnnualPayout);
  } catch (error) {
      console.error("Payroll processing failed:", error.message);
  }
}

(async () => {
  await runPayroll(emp1); // run async function
  // Polymorphism + Association: runPayroll works with any Employee subtype
  await runPayroll(mgr1); // same function used for Employee and Manager instances
})();