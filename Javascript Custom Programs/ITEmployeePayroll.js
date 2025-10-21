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
  get name() {
      return this.#name;
  }

  setName(newName) {
      if (newName.length < 3) throw new Error("Name too short");
      this.#name = newName;
  }

  get salary() {
      return this.#salary;
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
      console.log(`Employee ${this.#name} (${this.role}) earns ${this.#salary}`);
  }

  // 13. Static Methods
  static companyName() {
      return "EY";
  }
}

// Debugging via console.log()
console.log("=== EMPLOYEE DETAILS ===");
// 3. Object with new property post-creation
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
emp1.setName("Alan Collins");
emp1.setSalary(80000);
console.log("Access Employee new name-> ", emp1.name);
console.log("Access Employee new salary-> ", emp1.salary);
emp1.id=1001; emp1.role="Manager"; emp1.department="Technical Management";
emp1.displayInfo();
console.log("Accessing Object properties");
console.log(`id= ${emp1.id}, role= ${emp1.role}, department= ${emp1.department}`);

// 7. Inheritance
class Manager extends Employee {
  constructor(id, name, baseSalary, teamSize, department) {
      super(id, name, "Manager", baseSalary);
      this.teamSize = teamSize;
      this.department = department;
  }

  // 8. Polymorphism (method overriding)
  calculateBonus() {
      // console.log("this.salary()--", this.salary);
      // console.log("this.teamSize--", this.teamSize);
      return this.salary * 0.2 + this.teamSize * 100;
  }

  //it's own functionality
  approveLeave() {
      console.log(`Designated ${this.role} ${this.name} can approve leaves.`);
  }
}

const mgr1 = new Manager(1001, "Bradely", 80000, 30, "Technical Management");
console.log("----Manager Details----");
mgr1.displayInfo();
console.log(mgr1);

mgr1.setName("Bradely Cooper");
mgr1.department = "Business Management";     
console.log("Update Department--",mgr1.department);   
console.log("Manager name--", mgr1.name);
console.log("Bonus--", mgr1.calculateBonus());
mgr1.approveLeave();

// 6. Abstraction is implemented by hiding internal salary fields via private (#salary)

// 5. Encapsulation is shown through getters/setters and private fields

// 9. Prototype-based Inheritance
//Every object has a hidden link to another object called its prototype
//The fallback object an instance delegates to
function Intern(id, name) {
  this.id = id;
  this.name = name;
}
Intern.prototype.stipend = 1000;
//getInfo is the property name
//getInfo is a method (function) stored on the prototype
Intern.prototype.getInfo = function () {
  return `Intern ${this.name}, stipend: ${this.stipend}`;
};
const intern1 = new Intern(301, "Bob");
console.log(intern1.getInfo());

// 14. return keyword
function getAnnualCost(employee) {
  return employee.salary * 12;
}

// Exception Handling (throw, try, catch)
try {
  emp1.name = "Al"; // too short
} catch (err) {
  console.error("Caught Error:", err.message);
}

// Async/Await – simulate salary processing
async function processPayroll(employee) {
  console.log("Processing payroll for", employee.name);
  return new Promise((resolve) => {
      setTimeout(() => {
          const netPay = employee.salary + employee.calculateBonus();
          resolve(netPay);
      }, 1000);
  });
}

async function runPayroll() {
  try {
      const amount = await processPayroll(emp1);
      console.log("Net Pay:", amount);
  } catch (error) {
      console.error("Payroll processing failed:", error.message);
  }
}

runPayroll(); // run async function
