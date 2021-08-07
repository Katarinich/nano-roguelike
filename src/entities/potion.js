import GenericItem from './generic-item.js';

export default class Potion extends GenericItem {
  constructor(dungeon, x, y) {
    super(x, y);

    this.dungeon = dungeon;

    this.tile = 761;
    this.name = 'Holy Potion';
    this.description = 'A potion that removes cursed items when equipped.';

    this.dungeon.initializeEntity(this);
  }

  equip(itemNumber) {
    this.dungeon.log(
      `A blessing passes through your body and removes all cursed items.`
    );

    this.dungeon.player.removeItemByProperty('cursed', true);

    this.dungeon.player.removeItem(itemNumber);
  }
}
