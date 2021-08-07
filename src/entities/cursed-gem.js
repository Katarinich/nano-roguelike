import GenericItem from './generic-item.js';

export default class CursedGem extends GenericItem {
  constructor(dungeon, x, y) {
    super(x, y);

    this.dungeon = dungeon;

    this.tile = 720;
    this.name = 'Gem';
    this.description =
      'A cursed gem that is now stuck to your hand. You can only remove it by finding a potion.';
    this.actionPoints = 1;
    this.cursed = true;

    this.dungeon.initializeEntity(this);
  }

  turn() {
    if (this.dungeon.player.items.includes(this)) {
      this.active = true;

      this.dungeon.log(
        'Cursed gem gives 1 damage to player. Find potion to cure'
      );

      this.dungeon.player.healthPoints -= 1;
    }

    this.actionPoints = 0;
  }

  refresh() {
    this.actionPoints = 1;
  }

  over() {
    return this.actionPoints === 0;
  }
}
