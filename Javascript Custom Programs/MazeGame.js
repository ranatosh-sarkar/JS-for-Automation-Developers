/*******************************************************
 * Maze Game Program
 * Demonstrates:
 *   - 13 Coding Rules
 *   - 13 OOP Concepts
 *   - Exception Handling
 *   - Debugging with console.log()
 *   - JavaScript Promise usage
 *******************************************************/

/*******************************************************
 * (5) Program to Interface:
 * We'll define a MazeRoom "interface-like" class with 
 * an abstract 'enter()' method to be implemented.
 *******************************************************/
class MazeRoom {
  enter() {
    throw new Error("enter() must be overridden by subclasses");
  }
}

/*******************************************************
 * (6) Encapsulate What Varies:
 * Different special rooms: EnchantedRoom, BombedRoom
 *******************************************************/
class EnchantedRoom extends MazeRoom {
  enter() {
    console.log("You entered an Enchanted Room! Sparkles everywhere...");
  }
}

class BombedRoom extends MazeRoom {
  enter() {
    console.log("You entered a Bombed Room! Careful of leftover traps...");
  }
}

/*******************************************************
 * (1) Low Coupling, (2) High Cohesion:
 * Maze tries not to know internal details of each room type.
 *******************************************************/

/*******************************************************
 * (8) Composition: Maze "HAS" rooms
 *******************************************************/
class Maze {
  constructor() {
    this.rooms = []; // (9) Aggregation: 
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  explore() {
    console.log("Exploring the maze...");
    this.rooms.forEach((room) => {
      room.enter(); // (7) Delegation: Maze delegates the "enter" logic to the room
    });
  }
}

/*******************************************************
 * (11) Access Specifier with #private?
 * We'll do it in the MazeGame.
 *******************************************************/
class MazeGame {
  #difficulty; // private field

  constructor(difficulty) {
    this.#difficulty = difficulty;
    this.maze = new Maze();
  }

  get difficulty() {
    return this.#difficulty;
  }

  set difficulty(level) {
    console.log(`Changing difficulty to ${level}`);
    this.#difficulty = level;
  }

  /*******************************************************
   * (4) Inside Class Method + (12) this keyword
   *******************************************************/
  startGame() {
    console.log(`Starting Maze Game at difficulty: ${this.#difficulty}`);
    this.maze.explore();
  }

  /*******************************************************
   * (13) Static Methods - Maze creation
   * (3) SOLID, (4) Open-Closed: can add new room types 
   * without modifying MazeGame itself.
   *******************************************************/
  static createEnchantedMaze() {
    let game = new MazeGame("Medium");
    game.maze.addRoom(new EnchantedRoom());
    game.maze.addRoom(new EnchantedRoom());
    return game;
  }

  static createBombedMaze() {
    let game = new MazeGame("Hard");
    game.maze.addRoom(new BombedRoom());
    return game;
  }

  // (10) Association:
  // We can associate a 'Player' with this MazeGame if we want.
}

/*******************************************************
 * (9) Prototype-Based Inheritance: add method to MazeGame
 *******************************************************/
MazeGame.prototype.addRandomRoom = function() {
  // We'll use Promise to demonstrate an async action
  // (Extra) JavaScript Promise usage
  // e.g. we simulate fetching a new Room type from server
  return new Promise((resolve, reject) => {
    console.log("Retrieving a random room from server...");
    setTimeout(() => {
      try {
        let randomChoice = Math.random() > 0.5 ? new EnchantedRoom() : new BombedRoom();
        this.maze.addRoom(randomChoice);
        resolve("New room added successfully!");
      } catch (err) {
        reject("Failed to add random room");
      }
    }, 1000);
  });
};

/*******************************************************
 * (7) Inheritance + (8) Polymorphism:
 * We'll do specialized MazeGame types if needed.
 * But let's keep it simpler for now.
 *******************************************************/

/*******************************************************
 * (10) We'll define a Player for association
 *******************************************************/
class Player {
  constructor(name) {
    this.name = name;
  }

  joinGame(game) {
    console.log(`${this.name} joined the Maze Game!`);
    this.currentGame = game; // association
  }
}

/*******************************************************
 * DEMONSTRATION + Exception handling + Logging (debug)
 *******************************************************/
try {
  console.log("DEBUG: Creating MazeGame...");
  const enchantedGame = MazeGame.createEnchantedMaze();
  enchantedGame.startGame();

  // Add new property to only ONE object (2) Object
  enchantedGame.extraTheme = "Forest"; 
  console.log("EnchantedGame has new property => extraTheme:", enchantedGame.extraTheme);

  // Player association
  let playerBob = new Player("Bob");
  playerBob.joinGame(enchantedGame);

  // (Promised-based) addRandomRoom
  enchantedGame.addRandomRoom().then((msg) => {
    console.log("Promise resolved:", msg);
    console.log("Now let's re-explore after new room was added...");
    enchantedGame.startGame();
  }).catch((error) => {
    console.log("Promise rejected:", error);
  });

} catch (err) {
  console.log("An exception occurred in Maze Game:", err.message);
}
/*******************************************************
 * END of Maze Game
 *******************************************************/
