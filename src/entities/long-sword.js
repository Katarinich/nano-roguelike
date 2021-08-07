import GenericItem from './generic-item';

export default class LongSword extends GenericItem {
  constructor(dungeon, x, y) {
    super(x, y);

    this.dungeon = dungeon;

    this.tile = 992;

    this.name = 'A Long Sword';
    this.description = 'A long sword that causes between 4 and 8 damage';
    this.weapon = true;

    this.dungeon.initializeEntity(this);
  }

  damage() {
    return Phaser.Math.Between(4, 8);
  }
}
