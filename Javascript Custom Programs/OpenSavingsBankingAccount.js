/*************************************************
 * Banking Program - Demonstrating OOP Concepts
 *************************************************/

/*************************************************
 * (6) Abstraction:
 * The 'Account' class acts like an interface/base
 * with abstract methods deposit() and withdraw().
 *************************************************/
class Account {
  deposit(amount) {
    throw new Error("deposit() must be implemented by subclass");
  }
  withdraw(amount) {
    throw new Error("withdraw() must be implemented by subclass");
  }
}

/*************************************************
 * (7) Inheritance:
 * 'SavingsAccount' extends 'Account', inheriting
 * deposit() and withdraw() as abstract from the parent.
 *************************************************/

/*************************************************
 * (11) Access Specifiers:
 * '#balance' is a private field, showing Encapsulation.
 *************************************************/
class SavingsAccount extends Account {
  #balance;

  /*************************************************
   * (3) Constructor (Parameterized)
   *************************************************/
  constructor(accountNumber, initialDeposit) {
    super(); // Calls base class (Account) constructor
    this.accountNumber = accountNumber;
    this.#balance = initialDeposit; // (5) Encapsulation
  }

  /*************************************************
   * (10) Getters and Setters
   * For accessing the private '#balance'
   *************************************************/
  get balance() {
    return this.#balance;
  }

  /*************************************************
   * (8) Polymorphism:
   * Implementing the abstract methods deposit() and
   * withdraw() in our own way for SavingsAccount
   *************************************************/
  deposit(amount) {
    console.log(`Depositing $${amount} into SavingsAccount #${this.accountNumber}`);
    this.#balance += amount;
  }

  withdraw(amount) {
    console.log(`Withdrawing $${amount} from SavingsAccount #${this.accountNumber}`);
    if (this.#balance >= amount) {
      this.#balance -= amount;
    } else {
      console.log("Insufficient funds!");
    }
  }

  // Extra instance method
  checkBalance() {
    console.log(`Account #${this.accountNumber} balance: $${this.#balance}`);
  }
}

/*************************************************
 * (1) Class 'Bank'
 *************************************************/
class Bank {
  /*************************************************
   * (3) Constructor
   *************************************************/
  constructor(name) {
    this.name = name;
    this.accounts = []; // A place to store multiple account objects
  }

  /*************************************************
   * (13) Static Methods:
   * Here, a convenient method to open a new savings account.
   *************************************************/
  static openSavingsAccount(bank, accountNumber, initialDeposit) {
    const newAcc = new SavingsAccount(accountNumber, initialDeposit);
    bank.addAccount(newAcc);
    console.log(`Opened Savings Account #${accountNumber} with $${initialDeposit} at ${bank.name}`);
    return newAcc;
  }

  /*************************************************
   * (4) Method inside the class + (12) this Keyword
   *************************************************/
  addAccount(account) {
    console.log(`Adding an account to ${this.name}...`);
    this.accounts.push(account); // 'this' refers to the current Bank object
  }
}

/*************************************************
 * (9) Prototype-Based Inheritance:
 * Adding a method to Bank's prototype at runtime.
 *************************************************/
Bank.prototype.listAccounts = function() {
  console.log(`Accounts in ${this.name}:`);
  this.accounts.forEach(acc => {
    // (11) "Object Typecasting" in JS: using `instanceof`
    if (acc instanceof SavingsAccount) {
      console.log(`- Savings #${acc.accountNumber} | Balance: $${acc.balance}`);
    } else {
      console.log("- Unknown account type");
    }
  });
};

/*************************************************
 * Another Class: Customer
 * (10) Association: A Customer can link to accounts.
 *************************************************/
class Customer {
  constructor(name) {
    this.name = name;
    this.myAccounts = [];
  }

  associateAccount(account) {
    console.log(`${this.name} is now linked to account #${account.accountNumber}`);
    this.myAccounts.push(account);
  }
}

/*************************************************
 * DEMONSTRATION / USAGE
 *************************************************/

// (2) Creating Objects
const myBank = new Bank("Global Bank");

// (13) Static method usage to open new accounts
const acc1 = Bank.openSavingsAccount(myBank, 1001, 500);
const acc2 = Bank.openSavingsAccount(myBank, 1002, 1000);

// Checking balances with instance methods
acc1.checkBalance();
acc2.checkBalance();

// Using deposit/withdraw methods
acc1.deposit(200);
acc1.withdraw(100);
acc1.checkBalance(); // see the update

// Linking a customer to these accounts
const customerBob = new Customer("Bob");
customerBob.associateAccount(acc1);
customerBob.associateAccount(acc2);

// Listing all accounts in the bank
myBank.listAccounts();

// (2) Add a new property to exactly ONE object
// without modifying existing code
acc2.branch = "Downtown Branch";
console.log(`acc2 new property => branch: ${acc2.branch}`);

/*************************************************
 * END of Banking Program
 *************************************************/
