import { Gameboard } from './gameboard.js';

class Player {
  constructor(type = 'computer', size = 9) {
    this.type = type;
    this.board = new Gameboard(size);
  }
}

export { Player };
