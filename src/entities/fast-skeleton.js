import BasicMonster from './basic-monster';

import { FAST_SKELETON } from '../constants/tiles';

export default class FastSkeleton extends BasicMonster {
  constructor(dungeon, x, y) {
    super(dungeon, x, y);

    this.movementPoints = 3;
  }

  get name() {
    return 'A Fast Skeleton';
  }

  get tile() {
    return FAST_SKELETON;
  }

  refresh() {
    this.movementPoints = 3;
    this.actionPoints = 1;
  }
}
