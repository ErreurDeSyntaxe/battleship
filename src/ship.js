const shipNames = [
  'Carrier',
  'Battleship',
  'Submarine',
  'Destroyer',
  'Patrol Boat',
];

export class Ship {
  constructor(shipName, shipLength, hits = 0) {
    if (!shipNames.includes(shipName)) {
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
