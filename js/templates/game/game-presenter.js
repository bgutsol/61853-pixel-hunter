import {GAME_TYPES, ANSWER_TYPES} from '../../data/quest-data';
import Application from '../../application';
import Header from '../components/header-view';
import Footer from '../components/footer-view';
import LevelTwoAnswersView from './level-two-answer-view';
import LevelOneAnswerView from './level-one-answer-view';
import LevelChoosePaintView from './level-choose-paint-view';

class GamePresenter {
  constructor(model) {
    this.model = model;

    this.header = new Header();
    this.content = this.createLevel();
    this.footer = new Footer();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);

    this._interval = null;
    this.init();
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

  init() {
    this.model.resetTime();
    this.changeLevel();

    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.answer(false);
      }
      this.updateHeader();
    }, 1000);
  }

  answer(isCorrect) {
    this.stopGame();

    if (isCorrect) {
      this.model.addStat(this.answerTypeByTime);
    } else {
      this.model.onWrongAnswer();
    }
    this.model.addAnswer({
      isCorrect,
      time: this.model.state.time
    });
    if (!this.model.hasLives() && this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.init();
    } else {
      this.endGame();
    }
  }

  comeback() {
    /* eslint-disable no-alert */
    const isAnswerPositive = confirm(`Are you sure? Your game progress will be lost.`);
    /* eslint-enable no-alert */
    if (isAnswerPositive) {
      Application.showGreeting();
    }
  }

  get answerTypeByTime() {
    if (this.model.state.time > 20) {
      return ANSWER_TYPES.fast;
    }
    if (this.model.state.time < 10) {
      return ANSWER_TYPES.slow;
    }
    return ANSWER_TYPES.correct;
  }

  endGame() {
    Application.showStats(this.model);
  }

  updateHeader() {
    const header = new Header(this.model.state);
    header.onBtnBackClick = this.comeback.bind(this);
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
