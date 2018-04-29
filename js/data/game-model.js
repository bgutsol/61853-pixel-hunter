import {INITIAL_STATE, updateState} from './quest';
import {QUEST_DATA, GAME_TYPES, ANSWER_TYPES} from './quest-data';

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  hasNextLevel() {
    return QUEST_DATA[this._state.level + 1] !== void 0;
  }

  get state() {
    return this._state;
  }

  nextLevel() {
    this._state = updateState(this._state, this._state.level + 1);
  }

  die() {
    this._state = updateState(this._state, this._state.lives - 1);
  }

  tick() {
    this._state = updateState(this._state, this._state.time - 1);
  }

  restart() {
    this._state = INITIAL_STATE;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  getCurrentLevel() {
    return QUEST_DATA[this._state.level];
  }
}

export default GameModel;
