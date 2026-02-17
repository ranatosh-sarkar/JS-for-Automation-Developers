
class Employee{
  #name;
  #salary;

  constructor(id, name, role, salary){
    this.id = id;
    this.#name = name;
    this.role = role;
    this.#salary = salary;
  }

  get name(){
    return this.#name;
  }

  get salary(){
    return this.#salary;
  }

  setName(name){
    if(name.length < 2) throw new Error('name too short');
    this.#name = name;
  }

  setSalary(amount){
    if(amount < 1) throw new Error('invalid salary');
    this.#salary = amount;
  }

  static companyName(){
    return 'EY';
  }

  calculateBonus(){
    return this.#salary * 0.1;
  }

  displayInfo(){
    console.log(`Employee ${this.#name} works as ${this.role} with id ${this.id} earns ${this.#salary}`);
  }
}

const emp1 = new Employee(101, 'Alan', 'Dev', 3500);
console.log('employee object current state');
console.log(emp1);
console.log(`         { name: ${emp1.name}, salary: ${emp1.salary} }`);
console.log('After promotion');
emp1.department = 'Leadership';
emp1.id = 1001;
emp1.role = 'Lead';
try{
  emp1.setName('A');
}catch(e){
  console.log(`caught error at (name): `, e.message);
}
try{
  emp1.setSalary(0);
}catch(e){
  console.log(`caught error at (salary): `, e.message);
}

emp1.setName('Alan Collins');
emp1.setSalary(5000);
emp1.displayInfo();
console.log(`Employee works at: `, Employee.companyName());
console.log(`Employee's Bonus: `, emp1.calculateBonus());

class Manager extends Employee{
  constructor(id, name, salary, teamSize){
    super(id, name, 'Project Manager', salary);
    this.department = 'Management';
    this.teamSize = teamSize;
  }

  calculateBonus(teamSize){
    return  this.salary *0.1 + (this.teamSize * 0.5);
  }

  approveLeaves(){
    console.log(`Designated ${this.role} ${this.name} with id ${this.id} earns ${this.salary} works under department ${this.department} 
      handles ${this.teamSize} team members can approve leaves!`);
  }
}

const mgr1 = new Manager(201, 'Bradely', 4500, 10);
console.log('manager object current state');
console.log(mgr1);
console.log(`         { name: ${emp1.name}, salary: ${emp1.salary} }`);
console.log('After promotion');
mgr1.department = 'Business Management';
mgr1.id = 2001;
mgr1.role = 'Business Manager';
mgr1.teamSize = 25
mgr1.setName('Bradely Cooper');
mgr1.setSalary(5000);
mgr1.approveLeaves();
console.log(`Employee works at: `, Employee.companyName());
console.log(`Employee's Bonus: `, mgr1.calculateBonus());

Manager.prototype.assignProject = function(project){
  this.project = project;
  return project;
}

console.log(`Manager is assigned to project: `, mgr1.assignProject('Apollo'));

// 3. create a getInfo() prototype function, create another three objects and update stipend and use displayInfo() & name
// 4. declare getAnnualCost() (salary * 12) - function declared outside class with return keyword 
// 5. without await - (netYearlyPay = getAnnualCost + calculateBonus)-processPayroll() using 'new' and Promise((resolve) => {}) and setTimeout(() => {})
// 6. with await - define and runPayroll() use try-catch - const totalAnnualPayout
// 7. use async to call runPayroll();

const intern1 = {firstname: 'Elon', lastnamme: 'Musk', role: 'Internship', id: 301};
intern1.stipend = 1000;
console.log(`Intern1 ${intern1.firstname} ${intern1.lastname} wth id ${intern1.id} is doing ${intern1.role}`);

class Intern extends Employee{
  constructor(id, name) {
    super(id, name, "Intern", 0);
  }
}

Intern.prototype.stipend = 1000; 

Intern.prototype.getInfo = function () { 
  return `Intern ${this.name}, stipend: ${this.stipend}`;
};

const intern2 = new Intern(302, "Bob");
console.log(`Second Intern: ${intern2.getInfo()}`);

Intern.prototype.stipend = 2000;
const intern3 = new Intern(303, "Tony");
console.log(`Third intern: ${intern3.getInfo()}`);
intern3.displayInfo(); 

const intern4 = new Intern(304, "Maverick");
console.log(`Fourth intern: ${intern4.getInfo()}`); 
intern4.displayInfo();
