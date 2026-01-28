import { describe, it, expect } from 'vitest';
import { Player } from '../src/player.js';

describe('Player Class', () => {
  it('exists', () => {
    expect(Player).toBeDefined();
  });

  it('creates a human player', () => {
    const player = new Player('human');
    expect(player.type).toBe('human');
  });

  it('creates a computer player', () => {
    const player = new Player();
    expect(player.type).toBe('computer');
  });

  it('creates a player with their own board', () => {
    const playerOne = new Player('human');
    const playerTwo = new Player('computer');

    // Each player has a board
    expect(playerOne).toHaveProperty('board');
    expect(playerTwo).toHaveProperty('board');

    playerOne.board.receiveAttack('a', 0);

    // After a single attack, boards are different
    expect(playerOne.board.board[0][0].attacked).toBeTruthy();
    expect(playerTwo.board.board[0][0].attacked).toBeFalsy();
  });
});
