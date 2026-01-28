import { Gameboard } from './gameboard.js';

class Player {
  constructor(type = 'computer') {
    this.type = type;
    this.board = new Gameboard(5);
  }
}

export { Player };
