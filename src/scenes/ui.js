import dungeonManager from '../managers/dungeon';

export default class UI extends Phaser.Scene {
  constructor(turnManager) {
    super('ui-scene');

    this.turnManager = turnManager;
    this.dungeon = dungeonManager;
  }

  create() {
    this.createdUI = false;

    this.scene.get('world-scene').events.on('createUI', () => {
      const iterator = this.turnManager.entities.values();
      const x = 80 * 16 - 190;
      let y = 10;

      for (let entity of iterator) {
        if (typeof entity.createUI === 'function') {
          const height = entity.createUI({ scene: this, x, y, width: 198 });

          y += height;
        }
      }

      this.add.line(x + 5, y, 0, 10, 175, 10, 0xcfc6b8).setOrigin(0);

      this.log = this.add.text(x + 10, y + 20, '', {
        font: '12px Arial',
        color: '#cfc6b8',
        wordWrap: {
          width: 180,
        },
      });

      this.createdUI = true;
    });
  }

  update() {
    if (this.createdUI) {
      const text = this.dungeon.msgs.join(`\n\n`);
      this.log.setText(text);
    }
  }
}
