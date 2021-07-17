export default class PlayerCharacter {
  constructor(dungeon, x, y) {
    this.dungeon = dungeon;

    this.movementPoints = 1;
    this.cursors = this.dungeon.scene.input.keyboard.createCursorKeys();
    this.x = x;
    this.y = y;
    this.tile = 29;
    this.hp = 10;
    this.moving = false;

    this.dungeon.initializeEntity(this);
  }

  refresh = () => {
    this.movementPoints = 1;
  };

  turn = () => {
    let moved = false;

    let newX = this.x;
    let newY = this.y;

    if (this.movementPoints > 0 && !this.moving) {
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

        if (this.dungeon.isWalkableTile(newX, newY)) {
          this.dungeon.moveEntityTo(this, newX, newY);
        }
      }
    }
  };

  over = () => {
    return this.movementPoints === 0 && !this.moving;
  };
}
