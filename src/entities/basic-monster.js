import PF from 'pathfinding';

import { BASIC_SKELETON } from '../constants/tiles';

export default class BasicMonster {
  constructor(dungeon, x, y) {
    this.dungeon = dungeon;

    this.movementPoints = 1;
    this.actionPoints = 1;
    this.healthPoints = 2;
    this.x = x;
    this.y = y;
    this.moving = false;

    this.dungeon.initializeEntity(this);
  }

  get name() {
    return 'A Dangerous Monster';
  }

  get tile() {
    return BASIC_SKELETON;
  }

  get attack() {
    return 2;
  }

  turn() {
    let oldX = this.x;
    let oldY = this.y;

    const playerX = this.dungeon.player.x;
    const playerY = this.dungeon.player.y;

    const grid = new PF.Grid(this.dungeon.level);
    const finder = new PF.AStarFinder();
    const path = finder.findPath(oldX, oldY, playerX, playerY, grid);

    if (this.movementPoints > 0 && !this.moving) {
      if (path.length > 2) {
        this.dungeon.moveEntityTo(this, path[1][0], path[1][1]);
      }

      this.movementPoints -= 1;
    }

    if (this.actionPoints > 0) {
      if (
        this.dungeon.distanceBetweenEntities(this, this.dungeon.player) <= 2
      ) {
        this.dungeon.attackEntity(this, this.dungeon.player);
      }

      this.actionPoints -= 1;
    }
  }

  onDestroy() {
    this.dungeon.log(`${this.name} was killed`);
    this.UIsprite.setAlpha(0.2);
    this.UItext.setAlpha(0.2);
  }

  refresh() {
    this.movementPoints = 1;
    this.actionPoints = 1;
  }

  over() {
    const isOver =
      this.movementPoints === 0 && this.actionPoints === 0 && !this.moving;

    if (isOver && this.UItext) {
      this.UItext.setColor('#cfc6b8');
    } else {
      this.UItext.setColor('#fff');
    }

    return isOver;
  }

  createUI(config) {
    const scene = config.scene;
    const x = config.x;
    const y = config.y;

    this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);
    this.UItext = scene.add.text(x + 20, y, this.name, {
      font: '16px Arial',
      fill: '#cfc6b8',
    });

    return 30;
  }
}
