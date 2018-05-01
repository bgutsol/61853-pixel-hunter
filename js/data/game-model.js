import {INITIAL_STATE, updateState} from './quest';
import {QUEST_DATA} from './quest-data';

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.reset();
  }

  get state() {
    return this._state;
  }

  get currentLevel() {
    return QUEST_DATA[this._state.level];
  }

  get stats() {
    return this._stats;
  }

  get answers() {
    return this._answers;
  }

  addStat(stat) {
    this.stats.push(stat);
  }

  addAnswer(answer) {
    this._answers.push(answer);
  }

  die() {
    this._state = updateState(this._state, {lives: this._state.lives - 1});
  }

  tick() {
    this._state = updateState(this._state, {time: this._state.time - 1});
  }

  resetTime() {
    this._state = updateState(this._state, {time: 30});
  }

  reset() {
    this._state = INITIAL_STATE;
    this._stats = [];
    this._answers = [];
  }

  isDead() {
    return this._state.lives <= 0;
  }

  hasNextLevel() {
    return QUEST_DATA[this._state.level + 1] !== void 0;
  }

  nextLevel() {
    this._state = updateState(this._state, {level: this._state.level + 1});
  }
}

export default GameModel;
