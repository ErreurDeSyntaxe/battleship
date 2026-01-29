import { describe, it, expect } from 'vitest';
import { Gameboard } from '../src/gameboard.js';

describe('Gameboard', () => {
  it('exists', () => {
    expect(Gameboard).toBeDefined();
  });

  it.each([4, 10, 5.5, 'a'])('throws if the size is invalid', (invalidSize) => {
    expect(() => new Gameboard(invalidSize)).toThrow();
  });

  it('creates a Gameboard with valid size', () => {
    const size = 7;
    const gameboard = new Gameboard(size);
    expect(gameboard.size).toBe(size);
  });

  it('creates five ships', () => {
    const gameboard = new Gameboard(7);
    expect(gameboard.ships).toHaveLength(5);
  });

  // prettier-ignore
  it.each([
    [0, 0, { ship: { shipName: 'Carrier', shipLength: 5 }, attacked: false, coords: { y: 'a', x: 0 } }],
    [0, 1, { ship: { shipName: 'Carrier', shipLength: 5 }, attacked: false, coords: { y: 'a', x: 1 } }],
    [0, 2, { ship: { shipName: 'Carrier', shipLength: 5 }, attacked: false, coords: { y: 'a', x: 2 } }],
    [0, 3, { ship: { shipName: 'Carrier', shipLength: 5 }, attacked: false, coords: { y: 'a', x: 3 } }],
    [0, 4, { ship: { shipName: 'Carrier', shipLength: 5 }, attacked: false, coords: { y: 'a', x: 4 } }],
    [1, 0, { ship: { shipName: 'Battleship', shipLength: 4 }, attacked: false, coords: { y: 'b', x: 0 } }],
    [1, 1, { ship: { shipName: 'Battleship', shipLength: 4 }, attacked: false, coords: { y: 'b', x: 1 } }],
    [1, 2, { ship: { shipName: 'Battleship', shipLength: 4 }, attacked: false, coords: { y: 'b', x: 2 } }],
    [1, 3, { ship: { shipName: 'Battleship', shipLength: 4 }, attacked: false, coords: { y: 'b', x: 3 } }],
    [2, 0, { ship: { shipName: 'Submarine', shipLength: 3 }, attacked: false, coords: { y: 'c', x: 0 } }],
    [2, 1, { ship: { shipName: 'Submarine', shipLength: 3 }, attacked: false, coords: { y: 'c', x: 1 } }],
    [2, 2, { ship: { shipName: 'Submarine', shipLength: 3 }, attacked: false, coords: { y: 'c', x: 2 } }],
    [3, 0, { ship: { shipName: 'Destroyer', shipLength: 2 }, attacked: false, coords: { y: 'd', x: 0 } }],
    [3, 1, { ship: { shipName: 'Destroyer', shipLength: 2 }, attacked: false, coords: { y: 'd', x: 1 } }],
    [4, 0, { ship: { shipName: 'Patrol Boat', shipLength: 1 }, attacked: false, coords: { y: 'e', x: 0 } }],
    [4, 1, { ship: null, attacked: false , coords: { y: 'e', x: 1 }}],
    [4, 2, { ship: null, attacked: false , coords: { y: 'e', x: 2 }}],
  ])('places the ships on the board', (x, y, obj) => {
    const gameboard = new Gameboard(5);
    expect(gameboard.board[x][y]).toEqual(obj);
  });

  it('receives an attack in the correct format', () => {
    const gameboard = new Gameboard(5);
    const result = gameboard.receiveAttack('a', 0);

    expect(Array.isArray(result)).toBeTruthy();
    // expect(result).toHaveProperty('ship');
    // expect(result).toHaveProperty('attacked');
    // expect(result.attacked).toBeTruthy();
  });

  it('throws if an attack is out of bounds', () => {
    const gameboard5 = new Gameboard(5);
    expect(() => gameboard5.receiveAttack('f', 0)).toThrow(/Y Axis/i);
    expect(() => gameboard5.receiveAttack('a', -1)).toThrow(/X Axis/i);
    expect(() => gameboard5.receiveAttack([], 1)).toThrow(/Y Axis/i);

    const gameboard9 = new Gameboard(9);
    expect(() => gameboard9.receiveAttack('i', 0)).not.toThrow();
    expect(() => gameboard9.receiveAttack('j', 0)).toThrow(/Y Axis/i);
    expect(() => gameboard9.receiveAttack('a', 10)).toThrow(/X Axis/i);
  });

  it('records the attacks and disallows attacking twice the same spot', () => {
    const gameboard = new Gameboard(8);
    const result = gameboard.receiveAttack('a', 3);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result[2]).toHaveProperty('ship');
    expect(result[2]).toHaveProperty('attacked');
    expect(result[2].attacked).toBeTruthy();
    expect(() => gameboard.receiveAttack('a', 3)).toThrow(/already/i);
  });

  it('checks if coords contain a ship', () => {
    const gameboard = new Gameboard(6);
    gameboard.receiveAttack('a', 0);

    expect(gameboard.checkForHit(0, 0)).toBe(true);
    expect(gameboard.checkForHit(0, 5)).toBe(false);
  });

  it('records whether an attack was a hit or a miss', () => {
    const gameboard = new Gameboard(7);
    expect(gameboard.receiveAttack('a', 6)[2].attacked).toBe('miss');
    expect(gameboard.receiveAttack('a', 4)[2].attacked).toBe('hit');
  });

  it('informs a ship when it has been hit', () => {
    const gameboard = new Gameboard(9);
    gameboard.receiveAttack('a', 0);
    expect(gameboard.ships[4].hits).toBe(1);
  });

  it('knows when all ship have been sunk (game over)', () => {
    const gameboard = new Gameboard(9);
    const yCoords = ['a', 'b', 'c', 'd', 'e'];

    // It is not yet game over
    expect(gameboard.isGameOver()).toBeFalsy();
    // hit 25 squares just to simplify algo
    for (let i = 0; i < 5; i++)
      yCoords.forEach((y) => gameboard.receiveAttack(y, i));
    expect(gameboard.isGameOver()).toBeTruthy();
  });
});
