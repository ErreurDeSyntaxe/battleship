import { Player } from './player.js';

class App {
  constructor() {
    this.players = this.createPlayers();
    this.turn = 0;
    this.boards = this.buildBoards();
    this.attachListeners();
  }

  createPlayers() {
    return [new Player('human'), new Player('computer')];
  }

  switchPlayers() {
    this.turn = this.turn === 0 ? 1 : 0;
    if (this.turn) this.attackRandomly();
  }

  isGameOver() {
    const loser =
      (this.players[0].board.isGameOver() && 'playerOne') ||
      (this.players[1].board.isGameOver() && 'playerTwo');

    if (loser) console.log(`The loser is ${loser}`);
    return loser;
    // false if no loser
    // truthy if loser (non-empty string)
  }

  changeBtnText([y, x, shipObj], target) {
    const square = this.boards[target].querySelector(
      `[data-y="${String.fromCharCode(y + 97)}"][data-x="${x}"]`,
    );
    square.textContent = shipObj.attacked === 'hit' ? 'X' : 'O';
  }

  attack(y, x) {
    if (this.isGameOver()) return;

    const target = this.turn === 0 ? 1 : 0;
    try {
      const attackArr = this.players[target].board.receiveAttack(y, x);
      this.changeBtnText(attackArr, target);

      this.isGameOver();
      this.switchPlayers();
    } catch (err) {
      console.log(err.message);
      if (this.turn) this.attackRandomly();
    }
  }

  attackRandomly() {
    // 'a' to 'i'
    const y = String.fromCharCode(Math.floor(Math.random() * 8) + 97);
    const x = Math.floor(Math.random() * 8);
    setTimeout(() => {
      this.attack(y, x);
    }, 1000);
  }

  // disable human player's button
  appendBoard(playerGridDiv, playerBoard, disabled = false) {
    playerBoard.forEach((row) => {
      row.forEach((square) => {
        const { y, x } = square.coords;
        const btn = document.createElement('button');
        btn.textContent = '?';
        btn.classList.add('btnPlay');
        btn.setAttribute('data-y', y);
        btn.setAttribute('data-x', x);
        btn.disabled = disabled;
        playerGridDiv.appendChild(btn);
      });
    });
  }

  buildBoards() {
    const playerOneGrid = document.querySelector('.playerOneGrid');
    const playerOneBoard = this.players[0].board.board;

    const playerTwoGrid = document.querySelector('.playerTwoGrid');
    const playerTwoBoard = this.players[1].board.board;

    this.appendBoard(playerOneGrid, playerOneBoard, true);
    this.appendBoard(playerTwoGrid, playerTwoBoard);

    return [playerOneGrid, playerTwoGrid];
  }

  attachListeners() {
    const playerTwoGrid = document.querySelector('.playerTwoGrid');

    playerTwoGrid.addEventListener('click', (e) => {
      if (this.turn === 1) return; // buttons locked when computer's turn

      const btn = e.target;
      const coords = {
        y: btn.getAttribute('data-y'),
        x: btn.getAttribute('data-x'),
      };
      this.attack(coords.y, +coords.x);
    });
  }
}

const app = new App();
export { App };
