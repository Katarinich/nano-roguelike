import { PLAYER } from '../constants/tiles';

export default class PlayerCharacter {
  constructor(dungeon, x, y) {
    this.dungeon = dungeon;

    this.name = 'The Player';
    this.movementPoints = 1;
    this.actionPoints = 1;
    this.healthPoints = 15;

    this.cursors = this.dungeon.scene.input.keyboard.createCursorKeys();
    this.x = x;
    this.y = y;
    this.tile = PLAYER;
    this.moving = false;

    this.dungeon.initializeEntity(this);
  }

  get attack() {
    return 1;
  }

  refresh = () => {
    this.movementPoints = 1;
    this.actionPoints = 1;
  };

  onDestroy() {
    alert('OMG! You died!');
    location.reload();
  }

  turn = () => {
    const oldX = this.x;
    const oldY = this.y;

    let moved = false;

    let newX = this.x;
    let newY = this.y;

    if (this.movementPoints > 0) {
      if (this.cursors.left.isDown) {
        newX -= 1;
        moved = true;
      }

      if (this.cursors.right.isDown) {
        newX += 1;
        moved = true;
      }

      if (this.cursors.up.isDown) {
        newY -= 1;
        moved = true;
      }

      if (this.cursors.down.isDown) {
        newY += 1;
        moved = true;
      }

      if (moved) {
        this.movementPoints -= 1;

        if (!this.dungeon.isWalkableTile(newX, newY)) {
          const enemy = this.dungeon.entityAtTile(newX, newY);

          if (enemy && this.actionPoints > 0) {
            this.dungeon.attackEntity(this, enemy);
            this.actionPoints -= 1;
          }

          newX = oldX;
          newY = oldY;
        }

        if (newX !== oldX || newY !== oldY) {
          this.dungeon.moveEntityTo(this, newX, newY);
        }
      }
    }

    if (this.healthPoints <= 5) {
      this.sprite.tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }
  };

  over = () => {
    return this.movementPoints === 0 && !this.moving;
  };
}
