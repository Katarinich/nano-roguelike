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
    const isOver = this.movementPoints === 0 && !this.moving;

    if (isOver && this.UIheader) {
      this.UIheader.setColor('#cfc6b8');
    } else {
      this.UIheader.setColor('#fff');
    }

    if (this.UIstatsText) {
      this.UIstatsText.setText(
        `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`
      );
    }

    return isOver;
  };

  createUI(config) {
    const { x, y, scene } = config;

    let accumulatedHeight = 0;

    this.UIsprite = scene.add.sprite(x, y, 'tiles', this.tile).setOrigin(0);

    this.UIheader = scene.add.text(x + 20, y, this.name, {
      font: '16px Arial',
      color: '#cfc6b8',
    });

    this.UIstatsText = scene.add.text(
      x + 20,
      y + 20,
      `Hp: ${this.healthPoints}\nMp: ${this.movementPoints}\nAp: ${this.actionPoints}`,
      { font: '12px Arial', fill: '#cfc6b8' }
    );

    accumulatedHeight += this.UIstatsText.height + this.UIsprite.height;

    const itemsPerRow = 5;
    const rows = 2;
    this.UIitems = [];

    for (let row = 1; row <= rows; row++) {
      for (let cell = 1; cell <= itemsPerRow; cell++) {
        const rx = x + 25 * cell;
        const ry = y + 50 + 25 * row;

        this.UIitems.push(
          scene.add.rectangle(rx, ry, 20, 20, 0xcfc6b8, 0.3).setOrigin(0)
        );
      }
    }

    accumulatedHeight += 90;

    scene.add.line(x + 5, y + 120, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);

    return accumulatedHeight;
  }
}
