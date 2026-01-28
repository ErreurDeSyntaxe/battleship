const SHIPS = [
  { name: 'Patrol Boat', size: 1 },
  { name: 'Destroyer', size: 2 },
  { name: 'Submarine', size: 3 },
  { name: 'Battleship', size: 4 },
  { name: 'Carrier', size: 5 },
];

class Ship {
  constructor(shipName, shipLength, hits = 0) {
    if (!SHIPS.find((ship) => ship.name === shipName)) {
      throw new Error('Invalid ship name');
    }
    if (shipLength <= 0 || shipLength > 5 || typeof shipLength !== 'number') {
      throw new Error('Invalid ship length');
    }

    this.shipName = shipName;
    this.shipLength = shipLength;
    this.hits = hits;
  }

  hit() {
    if (!this.isSunk()) this.hits++;
    return;
  }
  isSunk() {
    return this.hits >= this.shipLength;
  }
}

export { Ship, SHIPS };
