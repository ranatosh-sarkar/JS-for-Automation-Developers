class Employee{

  #name;
  #salary;

  constructor(id, name, role, salary){
    this.id=id;
    this.#name=name;
    this.role=role;
    this.#salary=salary;
  }

  get name(){
    return this.#name;
  }

  setName(newName){
    if(newName.length < 2) throw new Error("Name too short");
    this.#name=newName;
  }

  get salary(){
    return this.#salary;
  }

  setSalary(amount){
    if(amount < 1) throw new Error("Invalid Amount");
    this.#salary=amount;
  }

  displayInfo(){
    console.log(`Employee ${this.#name} (${this.role}) with id ${this.id} earns ${this.#salary}`);
  }

  calculateBonus(){
    return this.#salary * 0.1;
  }

  static companyName(){
    return "EY";
  }
}

console.log("===Existing employee details===");
const emp1 = new Employee(101, "Alan", "Developer", 60000);
console.log("Before adding new dynamic property: ", emp1);
console.log(`name: ${emp1.name}, salary: ${emp1.salary}`);
emp1.displayInfo();

emp1.department = "Technology";
console.log("After adding new dynamic property: ", emp1);
console.log(`name: ${emp1.name}, salary: ${emp1.salary}`);
emp1.displayInfo();

emp1.setName("Alan Cooper");
emp1.setSalary(80000);
emp1.id=1001; emp1.role="Project Manager"; emp1.department="Management";
console.log("After Promotion New Employee details: ", emp1);
console.log(`name: ${emp1.name}, salary: ${emp1.salary}`);
emp1.displayInfo();

class Manager extends Employee{

  constructor(id, name, salary, teamSize){
    super(id, name, "Project Manager", salary);
    this.teamSize=teamSize;
    this.department="Project Management";
  }

  calculateBonus(){
    return this.salary*0.1 + this.teamSize*0.5;
  }

  approveLeave(){
    console.log(`Designated ${this.role} ${this.name} can approve leaves.`);
  }
}

const mgr1 = new Manager(101, "Bradly", 80000, 40);
console.log("Existing Manager Details:", mgr1);

mgr1.setName("Bradly Cooper");
mgr1.setSalary(90000);
mgr1.role="Senior Project Manager";
mgr1.department="Business Management";
mgr1.displayInfo();
console.log(`Manager new department: ${mgr1.department}`);
console.log(`Bonus: ${mgr1.calculateBonus()}`);
mgr1.approveLeave();
