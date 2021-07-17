export default class TurnManager {
  constructor() {
    this.entities = new Set();
    this.currentIndex = 0;
  }

  addEntity = (entity) => this.entities.add(entity);

  removeEntity = (entity) => this.entities.remove(entity);

  refresh = () => {
    this.entities.forEach((e) => e.refresh());
    this.currentIndex = 0;
  };

  turn = () => {
    if (this.entities.size > 0) {
      const entities = [...this.entities];
      const entity = entities[this.currentIndex];
      
      if (!entity.over()) {
        entity.turn();
      } else {
        this.currentIndex += 1;
      }
    }
  };

  over = () => [...this.entities].every((e) => e.over());
}
