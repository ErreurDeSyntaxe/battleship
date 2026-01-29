import { describe, expect, it } from 'vitest';
import { App } from '../src/app';

describe('App', () => {
  it('exists', () => {
    expect(App).toBeDefined();
  });

  it('creates two players (one human, one computer)', () => {
    const app = new App();

    expect(app).toHaveProperty('players');
    expect(app.players[0].type).toBe('human');
    expect(app.players[1].type).toBe('computer');
  });

  it('determines whether a game is over', () => {
    const app = new App();
    const yCoords = ['a', 'b', 'c', 'd', 'e'];

    // It is not yet game over
    expect(app.isGameOver()).toBeFalsy();
    // hit 25 squares just to simplify algo
    for (let i = 0; i < 5; i++)
      yCoords.forEach((y) => app.players[0].board.receiveAttack(y, i));
    expect(app.isGameOver()).toBeTruthy();
  });

  it('determines the loser and the winner', () => {
    const app = new App();
    const yCoords = ['a', 'b', 'c', 'd', 'e'];

    // It is not yet game over
    expect(app.isGameOver()).toBeFalsy();
    // hit 25 squares just to simplify algo
    for (let i = 0; i < 5; i++)
      yCoords.forEach((y) => app.players[0].board.receiveAttack(y, i));
    expect(app.isGameOver()).toMatch(/one/i);
  });

  it('keeps track of whose turn it is', () => {
    const app = new App();

    expect(app.turn).toBe(0); // game start -> playerOne plays
    app.attack('a', 0);
    expect(app.turn).toBe(1); // playerTwo's turn
    app.attack('a', 0);
    expect(app.turn).toBe(0); // playerOne's turn
    app.attack('a', 0); // illegal move (square already attacked)
    expect(app.turn).toBe(0); // still playerOne's turn
  });
});
