import {GAME_TYPES, ANSWER_TYPES} from '../../data/quest-data';
import Application from '../../application';
import getHeader from '../header';
import FooterView from '../footer-view';
import LevelTwoAnswersView from './level-two-answer-view';
import LevelOneAnswerView from './level-one-answer-view';
import LevelChoosePaintView from './level-choose-paint-view';

class GamePresenter {
  constructor(model) {
    this.model = model;

    this.header = getHeader(this.model.state);
    const level = this.createLevel();
    level.onAnswer = this.answer.bind(this);
    this.content = level;
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);

    this._interval = null;
  }

  createLevel() {
    switch (this.model.currentLevel.type) {
      case GAME_TYPES.chooseTwoAnswers:
        return new LevelTwoAnswersView(this.model.currentLevel, this.model.stats);
      case GAME_TYPES.chooseOneAnswer:
        return new LevelOneAnswerView(this.model.currentLevel, this.model.stats);
      case GAME_TYPES.choosePaint:
        return new LevelChoosePaintView(this.model.currentLevel, this.model.stats);
      default:
        return null;
    }
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startGame() {
    this.changeLevel();

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }

  answer(isCorrect) {
    this.stopGame();

    if (isCorrect) {
      this.model.addStat(this.answerTypeByTime);
    } else {
      this.model.die();
      this.model.addStat(ANSWER_TYPES.wrong);
    }
    this.model.addAnswer({
      isCorrect,
      time: this.model.state.time
    });
    if (!this.model.isDead() || this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.startGame();
    } else {
      this.exit();
    }
  }

  get answerTypeByTime() {
    if (this.model.state.time < 10) {
      return ANSWER_TYPES.fast;
    }
    if (this.model.state.time > 20) {
      return ANSWER_TYPES.slow;
    }
    return ANSWER_TYPES.correct;
  }

  restart() {
    this.model.restart();
    this.startGame();
  }

  exit() {
    Application.showStats(this.model);
  }

  updateHeader() {
    const header = getHeader(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateContent(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  changeLevel() {
    this.updateHeader();

    const level = this.createLevel();
    level.onAnswer = this.answer.bind(this);
    this.updateContent(level);
  }


}

export default GamePresenter;
