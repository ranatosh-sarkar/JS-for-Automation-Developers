/*************************************************
 * Car Manufacturing Program
 * Demonstrates OOP & 13 Coding Rules
 *************************************************/

/*************************************************
 * (5) Program to Interface:
 * We'll simulate an 'Engine' interface in JS.
 * Different engines will 'implement' start().
 *************************************************/
class Engine {
    start() {
      throw new Error("start() must be implemented by subclasses.");
    }
  }
  
  /*************************************************
   * (6) Encapsulate What Varies:
   * The engine type can vary (Petrol, Electric).
   * (7) Favor Delegation Over Inheritance:
   * The Car delegates engine tasks to engine objects.
   *************************************************/
  
  /*************************************************
   * PetrolEngine (Implements Engine interface)
   *************************************************/
  class PetrolEngine extends Engine {
    start() {
      console.log("Petrol Engine: Starting with fuel ignition...");
    }
  }
  
  /*************************************************
   * ElectricEngine (Implements Engine interface)
   *************************************************/
  class ElectricEngine extends Engine {
    start() {
      console.log("Electric Engine: Starting with battery power...");
    }
  }
  
  /*************************************************
   * (1) Low Coupling:
   * Car doesn't need to know how the engine starts internally.
   * (2) High Cohesion:
   * Car focuses on its own attributes: brand, model, year, etc.
   *************************************************/
  
  /*************************************************
   * (11) Access Specifiers:
   * We use # to mark private fields in ES2022+.
   * (12) Parameterized Constructor
   *************************************************/
  class Car {
    #year; // #private field for Encapsulation
  
    constructor(brand, model, year, engine) {
      this.brand = brand;   // public property
      this.model = model;   // public property
      this.#year = year;    // private property
      this.engine = engine; // (8) Composition: Car "has-a" Engine
    }
  
    /*************************************************
     * (4) Inside Class Method + (12) this keyword
     * 'this' refers to the current Car instance
     *************************************************/
    startCar() {
      console.log(`Starting ${this.brand} ${this.model}`);
      if (this.engine) {
        this.engine.start();  // (7) Delegation to Engine
      }
    }
  
    /*************************************************
     * (10) Getters and Setters for #year
     *************************************************/
    get year() {
      return this.#year;
    }
  
    set year(newYear) {
      console.log(`Updating car's production year to ${newYear}`);
      this.#year = newYear;
    }
  
    /*************************************************
     * (13) Static Methods:
     * A factory method to create different Car objects
     *************************************************/
    static createElectricCar(brand, model, year) {
      return new Car(brand, model, year, new ElectricEngine());
    }
  
    static createPetrolCar(brand, model, year) {
      return new Car(brand, model, year, new PetrolEngine());
    }
  
    /*************************************************
     * (3) SOLID Principle + (4) Open-Closed Principle:
     * - Car is open for extension if we add new engine types,
     *   but we don't modify Car itself.
     *************************************************/
  }
  
  /*************************************************
   * (7) Inheritance + (8) Polymorphism:
   * A specialized car: ElectricCar, extends Car
   *************************************************/
  class ElectricCar extends Car {
    constructor(brand, model, year, batteryRange) {
      super(brand, model, year, new ElectricEngine());
      this.batteryRange = batteryRange;
    }
  
    // Overriding a method for polymorphism
    startCar() {
      console.log(`(ElectricCar) Starting ${this.brand} ${this.model}`);
      super.startCar(); // still calls parent logic
      console.log(`Battery range: ${this.batteryRange} km`);
    }
  }
  
  /*************************************************
   * (9) Prototype-Based Inheritance:
   * We can add methods to Car.prototype, accessible to all Car objects.
   *************************************************/
  Car.prototype.honk = function () {
    console.log(`${this.brand} ${this.model} says: Beep beep!`);
  };
  
  /*************************************************
   * (10) Association & (9) Aggregation:
   * We create an Owner class that can be associated with a Car.
   *************************************************/
  class Owner {
    constructor(name) {
      this.name = name;
      // We'll hold a reference to a Car, or multiple Cars.
    }
  
    associateCar(car) {
      console.log(`${this.name} is now associated with ${car.brand} ${car.model}.`);
      this.myCar = car; // simple association
    }
  }
  
  /*************************************************
   * DEMONSTRATION
   *************************************************/
  
  // (12) Parameterized Constructor usage
  const car1 = Car.createElectricCar("Tesla", "Model 3", 2023);
  const car2 = Car.createPetrolCar("Toyota", "Corolla", 2020);
  
  // (1) Low Coupling, (2) High Cohesion in action
  car1.startCar();
  car2.startCar();
  
  // (9) Prototype method usage
  car1.honk();  // beep beep
  car2.honk();
  
  // (10) Association
  const ownerAlice = new Owner("Alice");
  ownerAlice.associateCar(car1);
  
  // (11) Access Specifier demonstration: #year with get/set
  console.log(`Car2 year: ${car2.year}`);
  car2.year = 2022; // calls setter
  
  // (2) Object + add new property to existing object without modifying code
  // We'll do it for only ONE object -> car2
  car2.color = "Blue";
  console.log(`Added new property to car2 => color: ${car2.color}`);
  
  // (8) Polymorphism: specialized class
  const eCar2 = new ElectricCar("NIO", "ET7", 2024, 700);
  eCar2.startCar();
  
  /*************************************************
   * END of Car Manufacturing Program
   *************************************************/
  