import { Ship, SHIPS } from './ship.js';

export class Gameboard {
  constructor(size) {
    this.validateSize(size);
    this.size = size;
    this.board = this.buildBoard(this.size);
    this.ships = this.createShips();
    this.placeShips(this.ships);
  }

  isGameOver() {
    return this.ships.reduce((acc, cur) => cur.isSunk() && acc, true);
  }

  validateSize(s) {
    if (s < 5 || s > 9 || !Number.isInteger(s) || typeof s !== 'number')
      throw new Error('Invalid size for Gameboard (from 5 to 9)');
  }

  buildBoard(size) {
    const board = [];

    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = {
          ship: null,
          attacked: false,
          coords: { y: String.fromCharCode(i + 97), x: j },
        };
      }
    }

    return board;

    // return Array.from({ length: size }, () =>
    //   Array.from({ length: size }, () => {
    //     return { ship: null, attacked: false };
    //   }),
    // );
  }

  createShips() {
    const ships = [];
    SHIPS.forEach((ship) => {
      const newShip = new Ship(ship.name, ship.size, 0);
      ships.push(newShip);
    });

    return ships;
  }

  placeShips(ships) {
    const reversed = [...ships].reverse();
    reversed.forEach((ship, index) => {
      for (let i = 0; i < ship.shipLength; i++)
        // Already in the array is an obj { ship: null, attacked: false }
        this.board[index][i].ship = {
          shipName: ship.shipName,
          shipLength: ship.shipLength,
        };
    });
  }

  convertCoords(s) {
    return s.toLowerCase().charCodeAt(0) - 97;
  }

  // Coordinates are (string, number) where string goes from A to E|F|G|H|I
  validateAttack(s, n) {
    if (typeof s !== 'string' || this.convertCoords(s) >= this.size)
      throw new Error('Invalid coordinates: Y Axis');

    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0 || n > this.size)
      throw new Error('Invalid coordinates: X Axis');
  }

  recordAttack(y, x) {
    if (this.board[y][x].attacked)
      throw new Error('You already hit that target. Try new coordinates.');

    if (!this.checkForHit(y, x)) this.board[y][x].attacked = 'miss';
    else {
      this.board[y][x].attacked = 'hit';
      return this.board[y][x].ship.shipName;
    }
  }

  checkForHit(y, x) {
    if (this.board[y][x].ship) return true;
    return false;
  }

  // Coordinates are (y, x), NOT (x, y)
  receiveAttack(tempY, x) {
    this.validateAttack(tempY, x);

    const y = this.convertCoords(tempY);
    const shipName = this.recordAttack(y, x);
    if (shipName) {
      const target = this.ships.find((ship) => ship.shipName === shipName);
      target.hit();
    }

    return [y, x, this.board[y][x]];
  }
}
