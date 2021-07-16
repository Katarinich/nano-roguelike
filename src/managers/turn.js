export default class TurnManager {
  constructor() {
    this.entities = new Set();
    this.lastCall = Date.now();
    this.interval = 150;
  }

  addEntity = (entity) => this.entities.add(entity);

  removeEntity = (entity) => this.entities.remove(entity);

  refresh = () => this.entities.forEach((e) => e.refresh());

  turn = () => {
    const now = Date.now();
    const limit = this.lastCall + this.interval;

    if (now > limit) {
      for (let e of this.entities) {
        if (!e.over()) {
          e.turn();
          break;
        }
      }

      this.lastCall = Date.now();
    }
  };

  over = () => [...this.entities].every((e) => e.over());
}
