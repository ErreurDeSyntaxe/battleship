import { describe, it, expect } from 'vitest';
import { Ship } from '../src/ship.js';

describe('Ship', () => {
  it('exists', () => {
    expect(Ship).toBeDefined();
  });

  it.each([
    ['Patrol Boat', 1, 0],
    ['Destroyer', 2, 0],
    ['Submarine', 3, 0],
    ['Battleship', 4, 0],
    ['Carrier', 5, 0],
  ])('creates a ship with the correct length', (shipName, shipLength, hits) => {
    const ship = new Ship(shipName, shipLength, hits);
    expect(ship.shipName).toBe(shipName);
    expect(ship.shipLength).toBe(shipLength);
    expect(ship.hits).toBe(hits);
  });

  it.each([-1, 0, 6, '3'])(
    'throws an error for invalid ship lengths',
    (invalidLength) => {
      expect(() => new Ship('invalidShip', invalidLength, 0)).toThrow();
    },
  );

  it.each(['carrier', 0, false])(
    'throws an error for invalid ship names',
    (invalidName) => {
      expect(() => new Ship(invalidName, 3, 0)).toThrow();
    },
  );

  it('registers hits correctly', () => {
    const ship = new Ship('Destroyer', 2, 0);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
    ship.hit(); // This hit should not increase hits beyond shipLength
    expect(ship.hits).toBe(2);
  });

  it('identifies when a ship is sunk', () => {
    const ship = new Ship('Submarine', 3, 0);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
