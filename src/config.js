export default {
  type: Phaser.AUTO,
  width: 80 * 16,
  height: 50 * 16,
  backgroundColor: '#472d3c',
  parent: 'game',
  pixelArt: 'true',
  zoom: 1,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};
