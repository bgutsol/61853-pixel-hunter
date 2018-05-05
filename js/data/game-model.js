import {INITIAL_STATE, updateState} from './quest';
import {answerTypes} from './quest-data';

class GameModel {
  constructor(data, playerName) {
    this.data = data;
    this.playerName = playerName;
    this.reset();
  }

  get state() {
    return this._state;
  }

  get currentLevel() {
    return this.data[this._state.level];
  }

  get stats() {
    return this._stats;
  }

  get answers() {
    return this._answers;
  }

  get lives() {
    return this._state.lives;
  }

  addStat(stat) {
    this.stats.push(stat);
  }

  addAnswer(answer) {
    this._answers.push(answer);
  }

  onWrongAnswer() {
    this._state = updateState(this._state, {lives: this._state.lives - 1});
    this.addStat(answerTypes.WRONG);
  }

  reset() {
    this._state = INITIAL_STATE;
    this._stats = [];
    this._answers = [];
  }

  hasLives() {
    return this._state.lives > 0;
  }

  hasNextLevel() {
    return Boolean(this.data[this._state.level + 1]);
  }

  nextLevel() {
    this._state = updateState(this._state, {level: this._state.level + 1});
  }
}

export default GameModel;
