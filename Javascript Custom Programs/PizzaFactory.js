/*******************************************************
 * Pizza Factory Program
 * Demonstrates:
 *   - 13 Coding Rules
 *   - 13 OOP Concepts
 *   - Exception Handling (throw, try-catch)
 *   - Debugging with console.log()
 *   - JavaScript Callback usage
 *******************************************************/

/*******************************************************
 * (5) Program to Interface:
 * We'll create a 'PizzaBase' interface-like class that 
 * has a method 'prepareDough()' to be implemented by 
 * subclasses (ThinCrust, ThickCrust).
 *******************************************************/
class PizzaBase {
  prepareDough() {
    throw new Error("prepareDough() must be implemented by subclasses");
  }
}

/*******************************************************
 * (6) Encapsulate What Varies:
 * The crust type is what varies (thin vs thick).
 * (7) Favor Delegation Over Inheritance:
 * We'll delegate dough prep to these classes.
 *******************************************************/
class ThinCrust extends PizzaBase {
  prepareDough() {
    console.log("Preparing thin crust dough...");
  }
}

class ThickCrust extends PizzaBase {
  prepareDough() {
    console.log("Preparing thick crust dough...");
  }
}

/*******************************************************
 * (1) Low Coupling, (2) High Cohesion:
 * 'Pizza' doesn't need to know the internals of dough prep.
 * Each class focuses on a single responsibility.
 *******************************************************/

/*******************************************************
 * (8) Composition: A Pizza "HAS-A" base (crust).
 *******************************************************/

/*******************************************************
 * (11) Access Specifiers: We'll use #private fields.
 * (12) Parameterized Constructor
 *******************************************************/
class Pizza {
  #size; // e.g., 'small', 'medium', 'large'

  constructor(name, size, base) {
    this.name = name;    // public property
    this.#size = size;   // private property
    this.base = base;    // composition with PizzaBase
  }

  // (10) Getter/Setter for #size
  get size() {
    return this.#size;
  }

  set size(newSize) {
    console.log(`Setting pizza size to ${newSize}...`);
    this.#size = newSize;
  }

  /*******************************************************
   * (4) Method inside class + (12) this keyword usage
   *******************************************************/
  preparePizza(callback) {
    console.log(`Preparing "${this.name}" pizza...`);
    this.base.prepareDough(); // (7) Delegation
    console.log(`Adding toppings for "${this.name}"...`);

    // (Extra) Demonstrate JavaScript Callback
    // Once pizza is ready, we call the callback
    setTimeout(() => {
      callback(`"${this.name}" pizza is ready! Enjoy.`);
    }, 1000); 
  }

  /*******************************************************
   * (13) Static Methods: A factory method for pizzas
   *******************************************************/
  static createThinCrustPizza(name) {
    return new Pizza(name, "medium", new ThinCrust());
  }

  static createThickCrustPizza(name) {
    return new Pizza(name, "large", new ThickCrust());
  }
}

/*******************************************************
 * (9) Prototype-Based Inheritance:
 * We can add a method to Pizza.prototype at runtime.
 *******************************************************/
Pizza.prototype.describe = function() {
  console.log(`This is a ${this.size} ${this.name} pizza with ${this.base.constructor.name}.`);
};

/*******************************************************
 * (3) SOLID, (4) Open-Closed:
 * We can add new crust types or new toppings
 * without modifying existing classes.
 *******************************************************/

/*******************************************************
 * (10) Association & (9) Aggregation:
 * Let's create a 'PizzaOrder' to hold multiple pizzas.
 *******************************************************/
class PizzaOrder {
  constructor(orderId) {
    this.orderId = orderId;
    this.pizzas = []; // aggregated collection of Pizza
  }

  addPizza(pizza) {
    this.pizzas.push(pizza);
  }
}

/*******************************************************
 * (7) Inheritance + (8) Polymorphism:
 * We'll do a specialized pizza type, e.g. 'PepperoniPizza'.
 *******************************************************/
class PepperoniPizza extends Pizza {
  constructor(size, base) {
    super("Pepperoni", size, base);
  }

  // Overriding preparePizza for extra step
  preparePizza(callback) {
    console.log("Adding pepperoni slices...");
    super.preparePizza(callback);
  }
}

/*******************************************************
 * (11) Object Typecasting - We can check using `instanceof`
 *******************************************************/

/*******************************************************
 * EXCEPTION HANDLING + DEBUGGING
 *******************************************************/
function finalizeOrder(order) {
  try {
    if (!order || order.pizzas.length === 0) {
      throw new Error("Order is empty or invalid!");
    }
    console.log(`Finalizing Order #${order.orderId} with ${order.pizzas.length} pizzas...`);
  } catch (err) {
    console.log("An error occurred while finalizing order:", err.message);
  }
}

/*******************************************************
 * DEMONSTRATION
 *******************************************************/

// (12) Parameterized Constructors in action
const pizza1 = Pizza.createThinCrustPizza("Margherita");
const pizza2 = new PepperoniPizza("large", new ThickCrust());

// (2) Object + add new property to only ONE object
pizza2.extraCheese = true; // without modifying the existing classes
console.log("Pizza2 has new property => extraCheese:", pizza2.extraCheese);

// Debug message
console.log("DEBUG: Created two pizzas.");

// (4) External function (outside class)
function handlePizzaReady(message) {
  console.log("CALLBACK MESSAGE:", message);
}

// Start preparing pizzas using callback
pizza1.preparePizza(handlePizzaReady);
pizza2.preparePizza(handlePizzaReady);

// Create a PizzaOrder (10) Association 
const order1 = new PizzaOrder(101);
order1.addPizza(pizza1);
order1.addPizza(pizza2);

// Show prototype method usage
pizza1.describe();
pizza2.describe();

console.log("DEBUG: Attempting to finalize the order now...");
finalizeOrder(order1); // Should succeed

console.log("DEBUG: Attempting to finalize an invalid order...");
const emptyOrder = new PizzaOrder(102);
finalizeOrder(emptyOrder); // Caught by try-catch

/*******************************************************
 * END of Pizza Factory
 *******************************************************/
