import PF from 'pathfinding';

import { FLOOR, TILE_SIZE, WALL } from '../constants/tiles';

import level from '../scenes/rooms/room_1';
import turnManager from './turn';

class DungeonManager {
  constructor(turnManager) {
    this.level = level;
    this.turnManager = turnManager;

    this.msgs = [];
  }

  get sprites() {
    return {
      floor: FLOOR,
      wall: WALL,
    };
  }

  initialize(scene) {
    this.scene = scene;

    const levelWithTiles = level.map((r) =>
      r.map((t) => (t === 1 ? this.sprites.wall : this.sprites.floor))
    );

    const config = {
      data: levelWithTiles,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    };

    const map = this.scene.make.tilemap(config);

    const tileset = map.addTilesetImage(
      'tiles',
      'tiles',
      TILE_SIZE,
      TILE_SIZE,
      0,
      1
    );

    this.map = map.createDynamicLayer(0, tileset, 0, 0);
  }

  log(text) {
    this.msgs = [text, ...this.msgs].slice(0, 8);
  }

  isWalkableTile(x, y) {
    const entities = [...this.turnManager.entities];

    if (
      entities.find(
        (entity) => entity.sprite && entity.x === x && entity.y === y
      )
    ) {
      return false;
    }

    const tileAtDestination = this.map.getTileAt(x, y);

    return tileAtDestination.index !== this.sprites.wall;
  }

  entityAtTile(x, y) {
    const entities = [...this.turnManager.entities];

    const resultEntity = entities.find(
      (entity) => entity.sprite && entity.x === x && entity.y === y
    );

    return resultEntity || false;
  }

  removeEntity(entity) {
    this.turnManager.entities.delete(entity);

    entity.sprite.destroy();

    delete entity.sprite;

    entity.onDestroy();
  }

  itemPicked(entity) {
    entity.sprite.destroy();
    delete entity.sprite;
  }

  initializeEntity(entity) {
    if (!entity.x || !entity.y) {
      return;
    }

    const x = this.map.tileToWorldX(entity.x);
    const y = this.map.tileToWorldY(entity.y);
    entity.sprite = this.scene.add.sprite(x, y, 'tiles', entity.tile);
    entity.sprite.setOrigin(0);
  }

  distanceBetweenEntities(entityA, entityB) {
    const grid = new PF.Grid(this.level);
    const finder = new PF.AStarFinder({ allowDiagonal: true });

    const path = finder.findPath(
      entityA.x,
      entityA.y,
      entityB.x,
      entityB.y,
      grid
    );

    if (path.length >= 2) {
      return path.length;
    } else {
      return false;
    }
  }

  moveEntityTo(entity, x, y) {
    entity.moving = true;

    this.scene.tweens.add({
      targets: entity.sprite,
      onComplete: () => {
        entity.moving = false;
        entity.x = x;
        entity.y = y;
      },
      x: this.map.tileToWorldX(x),
      y: this.map.tileToWorldY(y),
      ease: 'Power2',
      duration: 200,
    });
  }

  attackEntity(attacker, victim) {
    attacker.moving = true;
    attacker.tweens = attacker.tweens || 0;
    attacker.tweens += 1;

    this.scene.tweens.add({
      targets: attacker.sprite,
      onComplete: () => {
        attacker.sprite.x = this.map.tileToWorldX(attacker.x);
        attacker.sprite.y = this.map.tileToWorldX(attacker.y);
        attacker.moving = false;
        attacker.tweens -= 1;

        let damage = attacker.attack;
        victim.healthPoints -= damage;

        this.log(
          `${attacker.name} does ${damage} damage to ${victim.name} which now has ${victim.healthPoints} life left`
        );

        if (victim.healthPoints <= 0) {
          this.removeEntity(victim);
        }
      },
      x: this.map.tileToWorldX(victim.x),
      y: this.map.tileToWorldY(victim.y),
      ease: 'Power2',
      hold: 20,
      duration: 80,
      delay: attacker.tweens * 200,
      yoyo: true,
    });
  }
}

export default new DungeonManager(turnManager);
