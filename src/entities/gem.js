import GenericItem from './generic-item.js';

export default class Gem extends GenericItem {
  constructor(dungeon, x, y) {
    super(x, y);

    this.dungeon = dungeon;

    this.tile = 720;
    this.name = 'Gem';

    this.dungeon.initializeEntity(this);
  }
}
