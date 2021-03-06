import Application from '../../application';
import Header from '../components/header-view';
import Footer from '../components/footer-view';
import LevelTwoAnswersView from './level-two-answer-view';
import LevelOneAnswerView from './level-one-answer-view';
import LevelOneOfThreeView from './level-one-of-three-view';
import {GameType, AnswerType} from '../../data/quest-data';
import {INITIAL_TIME, calculateResult, createTimer} from '../../data/quest';

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
    this._timer = null;
    this.init();
  }

  createLevel() {
    switch (this.model.currentLevel.type) {
      case GameType.CHOOSE_TWO_ANSWERS:
        return new LevelTwoAnswersView(this.model.currentLevel, this.model.stats);
      case GameType.CHOOSE_ONE_ANSWER:
        return new LevelOneAnswerView(this.model.currentLevel, this.model.stats);
      case GameType.CHOOSE_ONE_OF_THREE:
        return new LevelOneOfThreeView(this.model.currentLevel, this.model.stats);
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
    this.changeLevel();

    this._timer = createTimer(INITIAL_TIME);
    this._interval = setInterval(() => {
      this._timer.tick();

      if (this._timer.time === 5) {
        this.header.startTimerBlinking();
      }
      if (this._timer.isOver) {
        this.answer(false);
        return;
      }

      this.header.updateTime(this._timer.time);
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
      time: this._timer.time
    });
    if (this.model.hasLives() && this.model.hasNextLevel()) {
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
      this.stopGame();
      Application.showGreeting(this.model.data);
    }
  }

  get answerTypeByTime() {
    if (this._timer.time > 20) {
      return AnswerType.FAST;
    }
    if (this._timer.time < 10) {
      return AnswerType.SLOW;
    }
    return AnswerType.CORRECT;
  }

  endGame() {
    const results = {
      stats: this.model.stats,
      lives: this.model.lives
    };

    if (this.model.hasLives()) {
      results.totalScore = calculateResult(this.model.answers, this.model.lives);
    }

    Application.showStats(results, this.model.playerName);
  }

  updateHeader() {
    const header = new Header(this.model.state, INITIAL_TIME);
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
