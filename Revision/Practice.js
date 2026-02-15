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

  setSalary(amount){
    if(amount < 1) throw new Error('invalid salary');
    this.#salary = amount;
  }

  setName(name){
    if(name.length < 2) throw new Error ('name too short');
    this.#name = name;
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

const emp1 = new Employee(101, 'Alan', 'Dev', 3000);
emp1.department = 'Operations';
console.log('existing employee object state');
console.log(emp1);
console.log(`{ name: '${emp1.name}', salary: '${emp1.salary}' }`);
console.log('after updation/promotion');
emp1.id = 1001;
emp1.role = 'Lead';
emp1.department = 'Leadership';
try{
  emp1.setName('A');
}catch(e){
  console.log(`error caught in (name): `, e.message);
}

try{
  emp1.setSalary(0);
}catch(e){
  console.log(`error caught in (salary): `, e.message);
}

emp1.setName('Alan Collins');
emp1.setSalary(5000);

emp1.displayInfo();
console.log(`Under department: ${emp1.department}`);

class Manager extends Employee{

  constructor(id, name, salary, teamSize){
    super(id, name, 'Project Manager', salary);
    this.department = 'Management';
    this.teamSize = teamSize;
  }

  calculateBonus(){
    return this.salary * 0.1 + (this.teamSize * 0.5);
  }

  approveLeave(){
    console.log(`Designated ${this.role} ${this.name} with id ${this.id} and department ${this.department} 
      with teamsize ${this.teamSize} can approve leaves!`);
  }

}

const mgr1 = new Manager(201, 'Bradely', 5000, 10);
console.log('existing Manager object state');
mgr1.displayInfo();
console.log(`{ department: '${mgr1.department}', teamSize: '${mgr1.teamSize}' }`);
console.log('after updation/promotion');
mgr1.id = 2001;
mgr1.role = 'Business Manager';
mgr1.department = 'Business Management';
mgr1.setSalary(7000);
mgr1.setName('Bradely Cooper');
mgr1.teamSize = 30;
mgr1.approveLeave();
console.log(`      with new salary: `, mgr1.salary);
console.log(`      and bonus: `, mgr1.calculateBonus());

Manager.prototype.assignProject = function(project) {
  this.project = project;
}

mgr1.assignProject('Apollo');
console.log(`Manager ${mgr1.name} is assigned to project: ${mgr1.project}`);

const intern1 = {firstname: 'Elon', lastname: 'Musk', id: '301'};
intern1.role = 'Internship';
console.log(`first intern ${intern1.firstname} ${intern1.lastname} with id ${intern1.id} doing ${intern1.role}`);

class Intern extends Employee{
  constructor(id, name){
    super(id, name, 'Internship', 0);
  }
}

Intern.prototype.stipend = 1000;

Intern.prototype.getInfo = function(){
  return `Intern ${this.name}, stipend: ${this.stipend}`;
}

const intern2 = new Intern(302, 'Bob');
console.log(`second `, intern2.getInfo());

Intern.prototype.stipend = 2000;

const intern3 = new Intern(303, 'Tony');
console.log(`third `, intern3.getInfo());
intern3.displayInfo();

const intern4 = new Intern(304, 'Maverick');
console.log(`fourth `, intern4.getInfo());
intern4.displayInfo();

function getAnnualCost(employee){
  return employee.salary *12;
}

async function processPayroll(employee){
  return new Promise((resolve) => {
    setTimeout(() => {
      const netYearlyPay = getAnnualCost(employee) + employee.calculateBonus();
      resolve(netYearlyPay);
    }, 1000)
  })
}

// 6. define and runPayroll() use try-catch - const totalAnnualPayout

async function runPayroll(employee){
  try{
    const totalAnnualPayout = await processPayroll(employee);
    console.log(`yearly net payout: `, totalAnnualPayout);
  }catch(e){
    console.log(`failed to process payroll: `, e.message);
  }
}

(async () => {
  await runPayroll(emp1);
  await runPayroll(mgr1);
})();

