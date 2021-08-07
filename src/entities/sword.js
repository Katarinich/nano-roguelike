import GenericItem from './generic-item';

export default class Sword extends GenericItem {
  constructor(dungeon, x, y) {
    super(x, y);

    this.dungeon = dungeon;
    this.tile = 994;
    this.name = 'A sword';
    this.description = 'A basic sword. Causes between 1 and 5 damage.';

    this.dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(1, 5);
  }
}
